# Alur Lengkap Supabase, GitHub, dan Vercel

Dokumen ini menjelaskan alur dari awal sampai aplikasi bisa online:

1. Buat tabel di Supabase.
2. Ambil API key Supabase.
3. Hubungkan API key ke project Next.js lokal.
4. Test form kontak di lokal.
5. Push project ke GitHub.
6. Deploy project ke Vercel.
7. Test form kontak di website online.

Fitur yang digunakan di project ini adalah form kontak. Saat user mengisi form dan klik `Kirim Pesan`, data akan dikirim ke Server Action, lalu disimpan ke tabel Supabase `contact_messages`.

## Gambaran Alur Data

```txt
User isi form kontak
        |
        v
components/ContactForm.js
        |
        v
app/contact/actions.js
        |
        v
lib/supabaseContact.js
        |
        v
Supabase table: contact_messages
```

File penting:

- `components/ContactForm.js`: tampilan form, loading state, dan notifikasi.
- `app/contact/actions.js`: Server Action untuk validasi dan simpan data.
- `lib/supabaseContact.js`: koneksi ke Supabase REST API.
- `supabase/contact_messages.sql`: query untuk membuat tabel dan policy.
- `.env.local`: menyimpan URL dan API key Supabase di lokal.

## 1. Buat Project Supabase

1. Buka https://supabase.com.
2. Login atau daftar akun.
3. Klik `New Project`.
4. Isi nama project, password database, dan region.
5. Tunggu sampai project selesai dibuat.

Setelah project aktif, lanjut ke pembuatan tabel.

## 2. Buat Tabel di Supabase

1. Buka project Supabase kamu.
2. Pilih menu `SQL Editor`.
3. Klik `New query`.
4. Buka file `supabase/contact_messages.sql` di project ini.
5. Copy semua isi file tersebut.
6. Paste ke SQL Editor Supabase.
7. Klik `Run`.

Query tersebut akan membuat tabel:

```txt
contact_messages
```

Kolom yang dibuat:

- `id`: ID otomatis.
- `name`: nama pengirim.
- `email`: email pengirim.
- `phone`: nomor HP, opsional.
- `subject`: subjek pesan, opsional.
- `message`: isi pesan.
- `created_at`: waktu data dibuat.

Query juga mengaktifkan RLS dan memberi izin insert untuk role `anon`, supaya form publik bisa menyimpan data tetapi tidak bebas membaca semua pesan.

## 3. Ambil API Key Supabase

1. Di Supabase Dashboard, masuk ke `Project Settings`.
2. Pilih menu `API Keys`.
3. Copy `Project URL`.
4. Copy `Publishable key`.

Contoh bentuk value:

```txt
SUPABASE_URL=https://abcdefghijk.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxx
```

`SUPABASE_URL` cukup sampai `.supabase.co`. Jangan isi dengan `/rest/v1`.

Jangan pakai `service_role` key untuk frontend atau repository publik. Untuk project ini cukup gunakan `Publishable key`.

## 4. Hubungkan API Key ke Project Lokal

1. Buka file `.env.local` di root project.
2. Isi dengan value asli dari Supabase:

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

Contoh setelah diisi:

```bash
SUPABASE_URL=https://abcdefghijk.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxxxxxxx
```

Catatan:

- `.env.local` tidak boleh di-push ke GitHub.
- File ini sudah aman karena `.env.local` masuk `.gitignore`.
- Setelah mengubah `.env.local`, restart dev server.

## 5. Test Form di Lokal

Jalankan project:

```bash
npm run dev
```

Kalau PowerShell memblokir `npm`, pakai:

```bash
npm.cmd run dev
```

Buka halaman:

```txt
http://localhost:3001/contact
```

Lalu test:

1. Isi nama.
2. Isi email.
3. Isi pesan.
4. Klik `Kirim Pesan`.
5. Pastikan tombol berubah menjadi loading.
6. Pastikan muncul notifikasi sukses.
7. Buka Supabase Dashboard.
8. Masuk ke `Table Editor`.
9. Pilih tabel `contact_messages`.
10. Pastikan data form masuk ke tabel.

Jika data sudah masuk, berarti koneksi lokal ke Supabase berhasil.

## 6. Push Project ke GitHub

Sebelum push, cek status file:

```bash
git status
```

Pastikan `.env.local` tidak muncul sebagai file yang akan di-commit.

Lalu jalankan:

```bash
git add .
git commit -m "Add Supabase contact form MVP"
git push origin main
```

Jika branch kamu bukan `main`, sesuaikan nama branch:

```bash
git push origin nama-branch-kamu
```

## 7. Deploy ke Vercel

1. Buka https://vercel.com.
2. Login dengan GitHub.
3. Klik `Add New Project`.
4. Pilih repository project ini.
5. Framework biasanya otomatis terdeteksi sebagai `Next.js`.
6. Sebelum deploy, buka bagian `Environment Variables`.
7. Tambahkan variable berikut:

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

Pilih environment:

- `Production`
- `Preview`

Lalu klik `Deploy`.

## 8. Test Website Setelah Deploy

Setelah deploy selesai:

1. Buka URL Vercel kamu.
2. Masuk ke halaman `/contact`.
3. Isi form kontak.
4. Klik `Kirim Pesan`.
5. Pastikan muncul notifikasi sukses.
6. Buka Supabase Dashboard.
7. Cek tabel `contact_messages`.
8. Pastikan data dari website online masuk ke tabel.

Jika data masuk, berarti deploy Vercel sudah berhasil terhubung ke Supabase.

## 9. Kalau Environment Variable di Vercel Diubah

Jika kamu mengganti `SUPABASE_URL` atau `SUPABASE_PUBLISHABLE_KEY` di Vercel:

1. Simpan perubahan environment variable.
2. Masuk ke tab `Deployments`.
3. Klik redeploy deployment terbaru.

Perubahan environment variable tidak otomatis berlaku ke deployment lama. Harus redeploy.

## Troubleshooting

### Error: Supabase belum dikonfigurasi

Penyebab:

- `.env.local` belum diisi.
- Nama variable salah.
- Dev server belum direstart.

Solusi:

1. Pastikan `.env.local` berisi `SUPABASE_URL` dan `SUPABASE_PUBLISHABLE_KEY`.
2. Stop dev server.
3. Jalankan ulang `npm.cmd run dev`.

### Error: Pesan belum berhasil disimpan

Penyebab umum:

- SQL tabel belum dijalankan di Supabase.
- RLS policy belum benar.
- API key salah.
- URL Supabase salah.

Solusi:

1. Jalankan ulang isi `supabase/contact_messages.sql` di SQL Editor Supabase.
2. Cek `.env.local`.
3. Restart dev server.
4. Test lagi form kontak.

### Data masuk di lokal, tetapi tidak masuk di Vercel

Penyebab:

- Environment variable belum ditambahkan di Vercel.
- Environment variable hanya dipilih untuk `Preview`, bukan `Production`.
- Belum redeploy setelah mengubah environment variable.

Solusi:

1. Buka Vercel Project Settings.
2. Masuk `Environment Variables`.
3. Tambahkan `SUPABASE_URL`.
4. Tambahkan `SUPABASE_PUBLISHABLE_KEY`.
5. Pilih `Production` dan `Preview`.
6. Redeploy.

### Error chunk Next.js atau Cannot find module di `.next`

Penyebab:

- Dev server masih jalan ketika menjalankan `npm run build`.
- Cache `.next` tercampur.

Solusi:

1. Stop dev server.
2. Hapus folder `.next`.
3. Jalankan ulang dev server.

```bash
npm.cmd run dev
```

## Checklist Akhir

- [ ] Tabel `contact_messages` sudah dibuat di Supabase.
- [ ] SQL policy dan grant sudah dijalankan.
- [ ] `.env.local` sudah diisi untuk test lokal.
- [ ] Form `/contact` berhasil submit di lokal.
- [ ] Data masuk ke Supabase dari lokal.
- [ ] Project sudah di-push ke GitHub.
- [ ] Environment variable sudah dibuat di Vercel.
- [ ] Website berhasil deploy.
- [ ] Form `/contact` berhasil submit dari website Vercel.
- [ ] Data masuk ke Supabase dari website Vercel.

## Referensi Resmi

- Supabase API Keys: https://supabase.com/docs/guides/getting-started/api-keys
- Supabase REST API: https://supabase.com/docs/guides/api/creating-routes
- Vercel Environment Variables: https://vercel.com/docs/environment-variables
