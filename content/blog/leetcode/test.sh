#!/bin/bash

# Pastikan folder exercism ada, jika tidak buat baru
mkdir -p exercism

# Pindahkan semua file/folder dengan prefix _exercism ke folder exercism
mv _exercism* exercism/

echo "Pemindahan selesai!"
