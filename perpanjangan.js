function showPerpanjangan() {
 app.CloseDrawer("left");
 var Modal = app.CreateDialog("Perpanjangan");
 layDlg = app.CreateLayout("linear", "vertical,fillxy,Center");
 layDlg.SetPadding(0.03,0.05,0.03,0.01);
 Modal.AddLayout(layDlg);
 token = app.CreateTextEdit("",0.8,0.1);
 token.SetHint("Token Perpanjangan");
 layDlg.AddChild(token);
 idApp = app.CreateButton("ID aplikasi : " + devId);
 idApp.SetOnTouch(function() {
   app.SetClipboardText(devId);
   app.ShowPopup("ID Aplikasi berhasil disalin");
 });
 layDlg.AddChild(idApp);
 btnProsesToken = app.CreateButton("PROSES",0.8,0.1, "custom");
 btnProsesToken.SetOnTouch(function() {
   app.WriteFile(pathToken, token.GetText());
   app.ShowPopup("Token diterima silahkan tutup aplikasi lalu buka kembali");
   app.Exit( );
   Modal.Dismiss();
 });
 layDlg.AddChild(btnProsesToken);
 btnBeliToken = app.CreateButton("Perpanjang tanpa token",0.8,0.1, "custom");
 btnBeliToken.SetOnTouch(beliToken);
 layDlg.AddChild(btnBeliToken);
 noHelp = app.CreateButton(" WA " + kontakPenjual,0.8,0.1, "custom");
 noHelp.SetOnTouch(function() {
   app.OpenUrl("whatsapp://send?phone=" + kontakPenjual + "&text=Saya pengguna PressKasir  dengan ID aplikasi " + devId + "0.Saya mau membeli token perpanjangan untuk 1 Tahun.");
 });
 layDlg.AddChild(noHelp);
 Modal.Show();
}
function beliToken() {
 app.ShowProgress();
 playStore.GetBillingInfo(idProduk, OnStoreInfo, mode);
}
function OnStoreInfo(bids) {
 if ("Purchased" == bids[0].price) {
   app.ShowPopup("Please jangan dihack !");
   app.Exit();
 } else {
   buy();
 }
 app.HideProgress();
}
function buy() {
 playStore.Purchase(idProduk, "MyToken", OnPurchased, mode);
}
function OnPurchased(a, ud, un, mode, exprData) {
 app.WriteFile(pathToken, crypt.Encrypt(nowAddDays(35), devId));
 app.ShowPopup("Perpanjangan berhasil, silahkan restart aplikasi");
}