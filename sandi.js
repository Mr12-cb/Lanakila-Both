
function showSettingSandi() {
 var Modal = app.CreateDialog("Perbarui sandi");
 layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
 layDlg.SetPadding(0.03,0.05,0.03,0.01);
 Modal.AddLayout(layDlg);
 inputSandiBaru = app.CreateTextEdit("",0.8,0.1);
 inputSandiBaru.SetHint("Kata sandi baru");
 layDlg.AddChild(inputSandiBaru);
 inputSandiLama = app.CreateTextEdit("",0.8,0.1);
 inputSandiLama.SetHint("Kata sandi lama");
 layDlg.AddChild(inputSandiLama);
 btnSimpan = app.CreateButton("Simpan",0.8,0.1, "custom");
 btnSimpan.SetOnTouch(function() {
   if (app.LoadText("SandiStok", "") == inputSandiLama.GetText()) {
     app.SaveText("SandiStok", inputSandiBaru.GetText());
     app.SendText("Berhasil menyimpan");
     Modal.Dismiss();
   } else {
     app.SendText("Sandi lama salah");
   }
 });
 layDlg.AddChild(btnSimpan);
 teks = app.CreateText("Kosongkan sandi lama jika Anda belum pernah mengatur sandi.\nKosongkan sandi baru jika ingin menghapus sandi sekarang.",0.8,0.15, "multiline");
 layDlg.AddChild(teks);
 teks.SetTextColor("white");
 Modal.Show();
}
function otentikasi() {
 var Modal = app.CreateDialog("Masukan sandi");
 layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
 layDlg.SetPadding(0.03,0.05,0.03,0.01);
 Modal.AddLayout(layDlg);
 inputSandi = app.CreateTextEdit("",0.8,0.1, "password");
 inputSandi.SetHint("Kata sandi");
 layDlg.AddChild(inputSandi);
 btnMasuk = app.CreateButton("Masuk",0.8,0.1, "custom");
 btnMasuk.SetOnTouch(function() {
   if (app.LoadText("SandiStok", "") == inputSandi.GetText()) {
     lihatStokProduk();
     Modal.Dismiss();
   } else {
     app.SendText("Kata sandi salah");
   }
 });
 layDlg.AddChild(btnMasuk);
 teks = app.CreateText("Kosongkan sandi jika Anda belum pernah mengatur sandi",0.8,0.15, "multiline");
 layDlg.AddChild(teks);
 teks.SetTextColor("white");
 Modal.Show();
}
;