
function CreateDrawer() {
 drawerWidth =0.75;
 drawerScroll = app.CreateScroller(drawerWidth, 1);
 drawerScroll.SetBackColor("#242324");
 layDrawer = app.CreateLayout("Linear", "Left");
 drawerScroll.AddChild(layDrawer);
 layDrawerTop = app.CreateLayout("Absolute");
 layDrawerTop.SetBackColor("#242324");
 layDrawerTop.SetSize(drawerWidth,0.23);
 layDrawer.AddChild(layDrawerTop);
 var progress = app.CreateImage("Img/1659537248244.png",0.4);
 progress.SetPosition(0.2 * drawerWidth,0.001);
 layDrawerTop.AddChild(progress);
 
 var parent2 = app.CreateLayout("Linear", "Left");
 parent2.SetBackColor("#242324");
 layDrawer.AddChild(parent2);
 var child = app.CreateScroller(null, drawerWidth,0.001, "fix", 2, 2);
 child.SetSize(-1, 1, "px");
 
 parent2.AddChild(child);
 txtTitle = app.CreateText("Menu", -1, -1, "Left");
 txtTitle.SetTextColor("#666666");
 txtTitle.SetMargins(16, 5, 0, 0, "dip");
 txtTitle.SetTextSize(14, "dip");
 parent2.AddChild(txtTitle);
 var i = "Penjualan::[fa-book],Input DataProduk::[fa-pencil],Laporan::[fa-table],View Data::[fa-print],User::[fa-home],Header Struk::[fa-home],Footer Struk::[fa-home],";
 lstMenu1 = app.CreateList(i, drawerWidth, -1, "Menu,Expand");
 lstMenu1.SetOnTouch(lstMenu1_OnTouch);
 lstMenu1.SetTextColor("white");
 parent2.AddChild(lstMenu1);
 (child = app.CreateScroller(null, drawerWidth,0.001, "fix", 2, 2)).SetSize(-1, 1, "px");
 
 parent2.AddChild(child);
 txtTitle = app.CreateText("Setting", -1, -1, "Left");
 txtTitle.SetTextColor("#666666");
 txtTitle.SetMargins(16, 5, 0, 0, "dip");
 txtTitle.SetTextSize(14, "dip");
 parent2.AddChild(txtTitle);
 i = "Pengaturan::[fa-cogs],Cadangkan Data::[fa-copy],Pulihkan Data::[fa-paste],Reset Ulang Aplikasi::[fa-history]";
 lstMenu2 = app.CreateList(i, drawerWidth, -1, "Menu,Expand");
 lstMenu2.SetTextColor("white");
 lstMenu2.SetOnTouch(lstMenu1_OnTouch);
 parent2.AddChild(lstMenu2);
}
function lstMenu1_OnTouch(a) {
 switch(app.CloseDrawer("left"), a) {
   case "Stok Produk":
     otentikasi();
     break;
   case "Tambah Produk":
     inputProduk();
     break;
   case "Import Produk":
     importXLS();
     break;
   case "Penjualan":
     lihatDataPenjualan();
     break;
   case "Kredit":
     showListNasabah();
     break;
   case "Header Struk":
     setNamaToko();
     break;
   case "Footer Struk":
     setFooterStruk();
     break;
   case "Pembuat QR Code":
     showQRCodeMaker();
     break;
   case "Cadangkan Data":
     cadangkanData();
     break;
   case "Pulihkan Data":
     pulihkanData();
     break;
   case "Perpanjang":
     showPerpanjangan();
     break;
   case "Print Teks":
     printBiasa();
     break;
   case "Pengaturan":
     pengaturan();
     break;
   case "Reset Ulang Aplikasi":
     resetDataPabrik();
     break;
   case "Lainnya":
     showPromosi();
 }
}
function setNamaToko() {
 app.CloseDrawer("left");
 var Modal = app.CreateDialog("Header Struk");
 layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
 layDlg.SetPadding(0.03,0.05,0.03,0.01);
 Modal.AddLayout(layDlg);
 inputHeader = app.CreateTextEdit(app.LoadText("HeaderStruk", ""),0.8,0.5);
 inputHeader.SetHint("Teks ini akan tampil di atas struk pembelian");
 layDlg.AddChild(inputHeader);
 btnSimpanHeader = app.CreateDialog("Simpan",0.8,0.1, "custom");
 btnSimpanHeader.SetOnTouch(function() {
   app.SaveText("HeaderStruk", inputHeader.GetText());
   app.ShowPopup("Berhasil menyimpan");
   Modal.Dismiss();
   header = app.LoadText("HeaderStruk", "") + " \n\n\n" + tanggalSekarang();
   edt.SetText(header + "\n" + garis + "\n" + body + "\n\nTotal" + total + "\n" + garis + "\n\n" + footer,0.95, 1, "left,multiline,NoSpell");
 });
 layDlg.AddChild(btnSimpanHeader);
 Modal.Show();
}
function setFooterStruk() {
 app.CloseDrawer("left");
 var Modal = app.CreateDialog("Footer Struk");
 layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
 layDlg.SetPadding(0.03,0.05,0.03,0.01);
 Modal.AddLayout(layDlg);
 inputFooter = app.CreateTextEdit(app.LoadText("FooterStruk", ""),0.8,0.5);
 inputFooter.SetHint("Teks ini akan tampil di bawah struk pembelian");
 layDlg.AddChild(inputFooter);
 btnSimpanFooter = app.CreateDialog("Simpan",0.8,0.1, "custom");
 btnSimpanFooter.SetOnTouch(function() {
   app.SaveText("FooterStruk", inputFooter.GetText());
   app.ShowPopup("Berhasil menyimpan");
   Modal.Dismiss();
   footer = "\n\n" + app.LoadText("FooterStruk", "") + "\n\n";
   edt.SetText(header + "\n" + garis + "\n" + body + "\n\nTotal" + total + "\n" + garis + "\n\n" + footer,0.95, 1, "left,multiline,NoSpell");
 });
 layDlg.AddChild(btnSimpanFooter);
 Modal.Show();
}
function importXLS() {
 app.CloseDrawer("left");
 var group = app.CreateDialog("Import XLS/XLSX");
 group.SetBackColor("white");
 layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
 layDlg.SetPadding(0.01, 0,0.01,0.01);
 layDlg.SetBackColor("white");
 group.AddLayout(layDlg);
 web = app.CreateWebView(0.9,0.7, "IgnoreErrors,progress");
 web.LoadUrl("import-produk.html");
 layDlg.AddChild(web);
 group.Show();
}
function cadangkanData() {
 app.CopyFile("/sdcard/kn.db", "/sdcard/KJbackup.db");
 app.Alert("Pencadangan selesai, cadangan disimpan di memori Anda dengan nama KJbackup.db");
}
function pulihkanData() {
 var storage = app.ListFolder("/sdcard/", ".db");
 var fixtures = app.ListFolder("/sdcard/bluetooth", ".db");
 lstD = app.CreateListDialog("Pilih file backup", storage + "," + fixtures,0.9,0.7);
 lstD.SetOnTouch(function(name) {
   var krusovice = app.CreateYesNoDialog("Tindakan ini akan mengganti semua data saat ini");
   krusovice.SetOnTouch(function(canCreateDiscussions) {
     if ("Yes" == canCreateDiscussions) {
       app.CopyFile("/sdcard/" + name, "/sdcard/kn.db");
       app.ShowPopup("Pemulihan selesai");
     }
   });
   krusovice.Show();
 });
 lstD.Show();
}
function resetDataPabrik() {
 var krusovice = app.CreateYesNoDialog("Tindakan ini akan mengganti semua data saat ini");
 krusovice.SetOnTouch(function(a) {
   if ("Yes" == a) {
     app.CopyFile(app.GetAppPath() + "/DB/default.db", pathDB);
     app.ShowPopup("Reset ulang selesai");
   }
 });
 krusovice.Show();
}
function showPromosi() {
 var group = app.CreateDialog("Promosi dan Info");
 group.SetBackColor("white");
 layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
 layDlg.SetPadding(0.01, 0,0.01,0.01);
 layDlg.SetBackColor("white");
 group.AddLayout(layDlg);
 web = app.CreateWebView(1, 1, "IgnoreErrors,Progress,UseBrowser");
 web.LoadUrl("https://pressnet32.blogspot.com");
 layDlg.AddChild(web);
 group.Show();
}