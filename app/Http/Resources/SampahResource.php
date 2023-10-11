<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SampahResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'id_kategorisampah' => $this->id_kategorisampah,
            'nama' => $this->nama,
            'deskripsi' => $this->deskripsi,
            'foto' => $this->foto,
            'harga' => $this->harga
        ];
    }
}
