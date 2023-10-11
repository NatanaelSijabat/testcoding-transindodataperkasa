<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\KategoriResource;
use App\Models\kategori_sampah;
use Illuminate\Http\Request;

class KategorisampahController extends BaseController
{
    public function index()
    {
        $data = kategori_sampah::all();

        return $this->sendResponse(KategoriResource::collection($data), 'Data Kategori Sampah');
    }

    public function show($id)
    {
        $data = kategori_sampah::find($id);

        if (!$data)
            return $this->sendError('Data tidak ditemukan');

        return $this->sendResponse(new KategoriResource($data), 'Data Kategori Sampah By Id');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required'
        ]);

        $data = kategori_sampah::create($request->all());

        return $this->sendResponse(new KategoriResource($data), 'Data Kategori Berhasil Ditambahkan', 201);
    }

    public function update(Request $request, $id)
    {
        $data = kategori_sampah::find($id);

        $data->update($request->all());

        return $this->sendResponse(new KategoriResource($data), 'Data Kategori Berhasil Diperbarui');
    }

    public function destroy($id)
    {
        $data = kategori_sampah::find($id);
        $data->delete();

        return $this->sendResponse(null, 'Data Kategori Berhasil Dihapus');
    }
}
