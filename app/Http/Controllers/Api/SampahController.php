<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\SampahResource;
use App\Models\sampah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SampahController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = sampah::all();

        return $this->sendResponse(SampahResource::collection($data), 'Data Sampah');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, sampah $sampah)
    {
        $validator = $request->validate([
            'id_kategorisampah' => 'required',
            'nama' => 'required',
            'deskripsi' => 'required',
            'foto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'harga' => 'required'
        ]);

        $sampah->id_kategorisampah = $validator['id_kategorisampah'];
        $sampah->nama = $validator['nama'];
        $sampah->deskripsi = $validator['deskripsi'];
        $sampah->harga = $validator['harga'];

        if ($request->file('foto')) {
            $sampah->foto = $request->file('foto')->store('public/sampah');
        }

        if ($sampah->save()) {
            return $this->sendResponse(new SampahResource($sampah), 'Data Berhasil Ditambah');
        } else {
            return $this->sendError('Data Gagal Ditambah');
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = sampah::find($id);

        if (!$data)
            return $this->sendError('Data tidak ditemukan');

        return $this->sendResponse(new SampahResource($data), 'Data Sampah By Id');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $sampah = sampah::find($id);

        if (!$sampah) {
            return $this->sendError('Data tidak ditemukan', [], 404);
        }

        $validator = Validator::make($request->all(), [
            'id_kategorisampah' => 'sometimes|required',
            'nama' => 'sometimes|required',
            'deskripsi' => 'sometimes|required',
            'harga' => 'sometimes|required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validasi Gagal', $validator->errors(), 422);
        }

        if ($request->file('foto')) {
            $fotoLama = $sampah->foto;
            $fotoPath = $request->file('foto')->store('public/sampah');
            $sampah->foto = basename($fotoPath);

            if ($fotoLama) {
                Storage::delete('public/sampah/' . $fotoLama);
            }
        }

        $sampah->fill($request->all());

        $sampah->update();
        return $this->sendResponse(new SampahResource($sampah), 'Data Berhasil Diperbarui');
    }




    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $sampah = sampah::find($id);

        if (!$sampah) {
            return $this->sendError('Data tidak ditemukan', [], 404);
        }

        $fotoLama = $sampah->foto;

        if ($fotoLama) {
            Storage::delete($fotoLama);
        }

        if ($sampah->delete()) {
            return $this->sendResponse([], 'Data berhasil dihapus');
        } else {
            return $this->sendError('Data gagal dihapus');
        }
    }
}
