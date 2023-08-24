cfg.Light
cfg.MUI
 pathToken = "/sdcard/jkn";

kontakPenjual = "+6285729124111";
 _AddPermissions("contact");
var tr = "";
 app.EnableBackKey(false);
 app.SetOrientation("portrait");
app.PreventScreenLock(true);
app.LoadPlugin("BarcodeReader");
app.LoadPlugin("UIExtras");
 app.LoadPlugin("Support");
 app.LoadPlugin( "Lodash" );
sup = app.CreateSupport();
 mode = "IAP";
idProduk = "1_bulan";
 playStore = app.CreatePlayStore();
 spinnerSatuan = app.LoadText("SpinSatuan", ",bks,bji,box,btg,btl,btr,cm,dus,gls,gnt,gr,kg,klg,lbr,ltr,lsn,m,mm,ons,pak,pcs,prg,prs,rtg,rol,sak,sct,slp,snd".toUpperCase());
 uix = app.CreateUIExtras();
 picker = uix.CreateColorPickerDialog("Pilih warna",255, 100, 200, -1, "NoAlpha");
var devId = app.GetDeviceId();

app.LoadScript("scan.js");
 app.LoadScript("drawer.js");
app.LoadScript("ambil-data-produk.js");
app.LoadScript("stok.js");
 app.LoadScript("penjualan.js")
app.LoadScript("setting.js");
app.LoadScript("print.js")
 app.LoadScript("sandi.js");
app.LoadScript("perpanjangan.js");
 app.LoadScript("qrcode.js");
 app.LoadScript("kredit.js");
app.LoadScript("waktu.js");
 crypt = app.CreateCrypt();
var  baseFolder = "/sdcard/kasirjnet";
var pathDB = "/sdcard/kjn.db";


function OnStart() {
 
 
 if (!app.FolderExists(baseFolder)) {
   app.MakeFolder(baseFolder);
 }
 if (!app.FileExists(pathToken)) {
   app.CopyFile(app.GetAppPath() + "/DB/default.db", pathDB);
   app.WriteFile(pathToken, crypt.Encrypt(nowAddDays(10), devId));
 }
 if (!app.FileExists(pathDB)) {
   app.CopyFile(app.GetAppPath() + "/DB/default.db", pathDB);
 }
 var tempBlock = app.ReadFile(pathToken);
 if (exp = cekExpired(crypt.Decrypt(tempBlock, devId)), exp.SisaJam > 2e5 && app.SaveBoolean("FreeTime", true), exp.SisaJam < 1 || isNaN(exp.SisaJam)) {
   return showPerpanjangan();
app.HideProgress();
app.ShowPopup("Waktu penggunaan aplikasi telah berakhir");

 }
 
  var d = new Date
  myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
   nowDay = myDays[d.getDay()]
   tglSekarang = nowDay + ", " + d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
    tglSekarang;


 dbSekarang = tglSekarang.replace(",", "_").replace(/ /g, "_").replace(/\//g, "_");
 db = app.OpenDatabase(pathDB);
 db.ExecuteSql("ALTER TABLE produk ADD modal decimal(10,0)");
 db.ExecuteSql("CREATE TABLE IF NOT EXISTS " + dbSekarang + "(id integer primary key, data_struk text, total decimal(15,0),profit decimal(10,0))");
 db.ExecuteSql("ALTER TABLE " + dbSekarang + " ADD profit decimal(10,0)");
 db.ExecuteSql("CREATE TABLE IF NOT EXISTS penjualan(produk text,jumlah decimal(3,0),satuan text,harga decimal(8,0), total decimal(10,0),profit decimal(10,0))");
 db.ExecuteSql("CREATE TABLE IF NOT EXISTS template(id integer primary key,nama text,format text)");
 db.ExecuteSql("CREATE TABLE IF NOT EXISTS nasabah(id integer primary key,nama text,alamat text,kredit number(0,10))");
 db.ExecuteSql("CREATE TABLE IF NOT EXISTS setoran(id integer primary key,nasabah integer,tanggal text,jumlah number(0,10),metode text)");
 app.InitializeUIKit(color.teal)
 lay = MUI.CreateLayout("Absolute", "FillXY,Vcenter");
app.AddLayout(lay);
 apb = MUI.CreateAppBar("Lanakila Both", "", "");
 apb.SetOnMenuTouch(OnMenuTouch1);
 apb.SetOnControlTouch(OnControlTouch);
 apb.GetHeight();
 pageLay = MUI.CreateLayout("Linear", "horizontal");
 pageLay5 = MUI.CreateLayout("Linear", "horizontal");
 pageLay2 = MUI.CreateLayout("Linear", "Vertical,FillXY");
 pageLay3 = MUI.CreateLayout("Linear", "horizontal,fillx");
 pageLay4 = MUI.CreateLayout("Linear", "horizontal");
 yx = MUI.CreateTextH2("", 1,0.1);
 pageLay2.AddChild(yx);
 img = app.CreateImage("Img/Lanakila Both.png",0.5);
 pageLay2.AddChild(img);
 yx = MUI.CreateTextH2("", 1,0.1);
 pageLay2.AddChild(yx);
  lay.AddChild(pageLay2);
 lay.AddChild(apb);
    tef = MUI.CreateTEFilledIconLeft(0.8, "Left", "person", "USERNAME", true)
        pageLay2.AddChild(tef)
 
        tef = MUI.CreateTEFilledIconLeft(0.8, "Left,Password", "lock", "Password", true)
        pageLay2.AddChild(tef)

    tef = MUI.CreateTEFilledIconLeft(0.8, "Left", "wlan", "Alamat IP", true)
    tef.SetOnEnter(function ()
{
	app.Alert( "Gagal Terhubung" )
});

        pageLay2.AddChild(tef)
         btn1 = MUI.CreateButtonRaisedO("LOGIN",0.3);
btn1.SetOnTouch(function ()
{
	app.Alert( "TOLONG ISI SEMUA DATA" )
}
);
 pageLay2.AddChild(btn1);
 
CreateDrawer();
app.AddDrawer(drawerScroll, "Left", drawerWidth);
app.AddLayout( lay )
 }
function tt()
{
	
 tr = "1"

 app.InitializeUIKit(color.teal)
 lay = MUI.CreateLayout("Absolute", "FillXY,Vcenter");
app.AddLayout(lay);
 apb = MUI.CreateAppBar("Tenan", "menu", "");
 apb.SetOnMenuTouch(OnMenuTouch1);
 apb.SetOnControlTouch(OnControlTouch);
 apb.GetHeight();
 pageLay = MUI.CreateLayout("Linear", "horizontal");
 pageLay5 = MUI.CreateLayout("Linear", "horizontal");
 pageLay2 = MUI.CreateLayout("Linear", "Vertical,FillXY");
 pageLay3 = MUI.CreateLayout("Linear", "horizontal,fillx");
 pageLay4 = MUI.CreateLayout("Linear", "horizontal");
 yx = MUI.CreateTextH2("", 1,0.1);
 pageLay2.AddChild(yx);
 img = app.CreateImage("Img/ChartJS.png",0.5);
 pageLay2.AddChild(img);
 yx = MUI.CreateTextH2("", 1,0.1);
 pageLay2.AddChild(yx);
 btn1 = MUI.CreateButtonRaisedO("[fa-pencil] PENJUALAN",0.3);
btn1.SetOnTouch(Start);
 pageLay3.AddChild(btn1);
 btn2 = MUI.CreateButtonRaisedO("[fa-book]PRODUK",0.3);
 btn2.SetOnTouch(otentikasi);
btn2.SetVisibility("hide");
 pageLay4.AddChild(pageLay);
 //pageLay.AddChild(btn2);
 btn8 = MUI.CreateButtonRaisedO("[fa-cloud_upload] IMPORT",0.3);
btn8.SetOnTouch(importXLS);
btn8.SetVisibility("hide");
// pageLay5.AddChild(btn8);
 btn9 = MUI.CreateButtonRaisedO("[fa-book] LAPORAN",0.3);
btn9.SetOnTouch(lihatDataPenjualan);
 pageLay5.AddChild(btn9);
 btn3 = MUI.CreateButtonRaisedO("[fa-print]PRINT ",0.3);
btn3.SetOnTouch(printBiasa);
btn3.SetVisibility("hide");
 pageLay2.AddChild(pageLay3);
// pageLay3.AddChild(btn3);
 btn4 = MUI.CreateButtonRaisedO("[fa-barcode] SCAN",0.3);
 btn4.SetOnTouch(scan);
btn4.SetVisibility("hide");
 
// pageLay.AddChild(btn4);
 btn5 = MUI.CreateButtonRaisedO("[fa-book] VIEW DATA",0.3);
 btn5.SetOnTouch(lihatPenjualan);
 pageLay.AddChild(btn5);
 btn6 = MUI.CreateButtonRaisedO("[fa-tag] USER",0.3);
btn6.SetOnTouch(tenan);
 pageLay5.AddChild(btn6);
 btn7 = MUI.CreateButtonRaisedO("[fa-pencil]INPUT DATA PRODUK",0.3);
btn7.SetOnTouch(inputProduk);
 pageLay.AddChild(btn7);
 pageLay2.AddChild(pageLay4);
 pageLay2.AddChild(pageLay5);
 lay.AddChild(pageLay2);
 lay.AddChild(apb);
CreateDrawer();
app.AddDrawer(drawerScroll, "Left", drawerWidth);
app.AddLayout( lay )
 
}
function OnMenuTouch1() {
 app.OpenDrawer();
}
function tenan()
{

    lay = MUI.CreateLayout("Linear", "FillXY,VCenter")

        var headers = ["ID", "Name:Sortable", "userID","Password"]
        var values = [
            "1:tesUser:001:pass123"
        ]
        var table = MUI.CreateDataTable(headers, values, 0.96, 0.6, "Selectable")
        lay.AddChild(table)

        var ftr = table.AddFooter("Linear", "Horizontal, Right, VCenter", 0.09)

        var fBtn = MUI.CreateButtonFlat('EDIT PASSWORD')
        fBtn.SetEnabled(false)
        ftr.AddChild(fBtn)
        fBtn.SetOnTouch(function(){
            table.GetSelectedRows(function(x){
                table.SetRows("1:tesUser:123456:6")
            })
        })
        table.SetOnSelectionStatus(function(c) {
            if(c) fBtn.SetEnabled(true)
            else fBtn.SetEnabled(false)
        })

    app.AddLayout(lay)

}


function OnControlTouch($itemElement, e) {
 app.ShowPopup("You click " + $itemElement + ": Control index = " + e);
}

function scan() {
 tr = "3";
 dlgCam = app.CreateDialog("Scan barcode", "NoDim,NoFocus,NoCancel");
 dlgCam.SetBackColor("white");
 layDlgCam = app.CreateLayout("linear", "vertical,fillxy,left");
 layDlgCam.SetPadding(0.01, 0,0.01,0.01);
 layDlgCam.SetBackColor("white");
 dlgCam.AddLayout(layDlgCam);
 reader = app.LoadPlugin("BarcodeReader");
 cam = app.CreateCameraView(0.9,0.5, "VGA, UseYUV");
 cam.SetMargins(0.01,0.02,0.01,0.01);
 cam.SetOnReady(function() {cam.StartPreview(); });
 layDlgCam.AddChild(cam);
 app.ShowPopup("Arahkan barcode ke kamera");
 dlgCam.Show();
 cam.SetFocusMode("macro");
 setTimeout(" DecodeFromCamera(true);", 1e3);
}
function Start() {
 app.ShowProgress();
 tr = "2";
 app.InitializeUIKit(color.teal);
 layBar = MUI.CreateLayout("Absolute", "FillXY,VCenter");
 apb = MUI.CreateAppBar(" Tenan", "arrow_back", "search");
 apb.SetOnMenuTouch(OnMenuTouch);
 apb.GetHeight();
 lay = MUI.CreateLayout("Linear", "VCenter");
 lay.SetSize(1, 1);
lay.AddChild(MUI.CreateTextParagraph(""));
lay.AddChild(MUI.CreateTextParagraph(""));
lay.AddChild(MUI.CreateTextParagraph(""));
 layBar.AddChild(lay);
 layBar.AddChild(apb);
 app.AddLayout(layBar);
 produk = app.CreateTextEdit("",0.95,0.06, "singleline");
 produk.SetTextSize(15);
 produk.SetHint("Nama atau Kode Produk");
 produk.SetBackColor("");
 produk.SetTextColor("");
 produk.SetOnChange(ambilDataProduk);
 produk.SetOnEnter(function() {
   if (produk.GetText().length > 30) {
     return app.Alert("Nama produk maksimal 30 karakter")
 false
   }
   db.ExecuteSql("select * from produk where lower(nama)= '" + this.GetText().toLowerCase() + "' or  id= '" + this.GetText() + "';", [], function(a) {
     if (a.rows.length > 0) {
       produk.SetText(a.rows.item(0).nama);
       harga.SetText(a.rows.item(0).harga);
       jumlah.SetText("1");
       app.SaveText("SatuanAktif", a.rows.item(0).satuan);
       spinSat.SelectItem(a.rows.itrm(0).satuan);
       btnAddToStruk.SetVisibility("show");
     } else {
       app.SaveText("SatuanAktif", "");
     }
   });
   dlgRef.Dismiss();
 });
 lay.AddChild(produk);
 harga = app.CreateTextEdit("",0.95,0.06, "singleline,number");
 harga.SetTextSize(15);
 harga.SetMargins(0,0.001, 0, 0);
 harga.SetHint("Harga Per Satuan");
 harga.SetBackColor("");
 harga.SetOnTouch(function() {
   dlgRef.Dismiss();
 });
 lay.AddChild(harga);
 layTengah1 = app.CreateLayout("linear", "Horizontal,fillX");
 lay.AddChild(layTengah1);
 jumlah = app.CreateTextEdit("",0.45,0.06, "singleline,number");
 jumlah.SetTextSize(16);
 jumlah.SetHint("Jumlah pembelian");
 jumlah.SetOnTouch(function() {
   dlgRef.Dismiss();
 });
 jumlah.SetOnChange(function() {
   this.SetText(this.GetText().replace(",", "."));
   btnAddToStruk.SetVisibility("show");
 });
 layTengah1.AddChild(jumlah);
 spinSat = app.CreateSpinner(spinnerSatuan,0.5,0.07);
 layTengah1.AddChild(spinSat);
 layTengah2 = app.CreateLayout("linear", "Horizontal,fillX");
 lay.AddChild(layTengah2);
 btnAddToStruk = MUI.CreateButtonRaisedO("[fa-check-square-o] OK",0.35,0.09);
 btnAddToStruk.SetOnTouch(addToStruk);
 btnAddToStruk.SetVisibility("show");
 layTengah2.AddChild(btnAddToStruk);
 btnEditStruk = MUI.CreateButtonRaisedO("[fa-eraser] Edit Struk",0.35,0.09);
 btnEditStruk.SetOnTouch(editStruk);
 btnEditStruk.SetVisibility("show");
 layTengah2.AddChild(btnEditStruk);
 btnBayar = MUI.CreateButtonRaisedO("[fa-dollar] Bayar",0.3,0.09);
 btnBayar.SetOnTouch(bayar);
 btnBayar.SetVisibility("show");
// layTengah2.AddChild(btnBayar);
 scroll = app.CreateScroller(0.95,0.55);
 lay.AddChild(scroll);
 layScroll = app.CreateLayout("Linear", "VCenter,fillXY");
 layScroll.SetBackColor("silver");
 scroll.AddChild(layScroll);
 header = app.LoadText("HeaderStruk", "") + "\n\n" + tanggalSekarang() + "," + jamSekarang();
 garis = "================================";
 body = "";
 total = 0;

 footer = app.LoadText("FooterStruk", "") + " \n\n";
 edt = app.CreateTextEdit(header + "\n" + garis + "\n" + body + "\n\nTotal Rp" + total + "\n" + garis + "\n" + footer,0.95, 4, "left,multiline,NoSpell");
 edt.SetTextSize(16);
 edt.SetEnabled(false);
 edt.SetTextColor("black");
 edt.SetPadding(0.025,0.02,0.025,0.02);
 edt.SetBackColor("white");
 layScroll.AddChild(edt);
 buatStruk("...", 0);
 layBawah = app.CreateLayout("linear", "Horizontal,Center,fillX");
 lay.AddChild(layBawah);
 btnCari = MUI.CreateButtonRaisedO("[fa-search] Printer",0.5,0.09);
btnCari.SetOnTouch(pilihPrinter);
 layBawah.AddChild(btnCari);
 btnSend = MUI.CreateButtonRaisedO("[fa-print] SAVE",0.5,0.09);
 btnSend.SetOnTouch(btnSend_OnTouch);
 layBawah.AddChild(btnSend);
 bt = app.CreateBluetoothSerial();
 bt.SetOnConnect(bt_OnConnect);
 bt.SetOnReceive(bt_OnReceive);
 bt.SetSplitMode("End", "\n");
 usb = app.CreateUSBSerial();
 app.AddLayout(lay);
 CreateDrawer();
 app.AddDrawer(drawerScroll, "Left", drawerWidth);
 app.HideProgress();
}
function OnMenuTouch() {
 OnStart();
}
function OnBack() {
 if (2 == tr) {
   OnStart();
 } else {
   if (3 == tr) {
     dlgCam.Hide();
   } else {
     var krusovice = app.CreateYesNoDialog("Tutup aplikasi ?");
     krusovice.SetOnTouch(yesNo_OnTouch);
     krusovice.Show();
   }
 }
}
function yesNo_OnTouch(a) {
 if ("Yes" == a) {
   app.Exit( );
 }
}
function bantuan() {
 app.SendMail( "azis123g@gmail.com", "BANTUAN", "TULIS PESAN");
}