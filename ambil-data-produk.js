
function ambilDataProduk() {
 db.ExecuteSql("select * from produk where nama like '" + produk.GetText() + "%' order by nama limit 0,10;", [], function(rslt) {
   if (rslt.rows.length < 1 || "" == produk.GetText()) {
     dlgRef.Dismiss();
   } else {
     dlgRef.Show();
   }
   listSgg = "";
   var marked = 0;
   for (; marked < 20; marked++) {
     var b = rslt.rows.item(marked);
     listSgg = listSgg + (b.nama + ":") + b.harga + "/" + b.satuan + ":null#";
     lstRef.SetList(listSgg, "#");
   }
 });
}
function padFront(result, value, len) {
 for (; String(result).length < len;) {
   result = value + result;
 }
 return result;
}
function padEnd(s, str, maxLength) {
 for (; String(s).length < maxLength;) {
   s = s + str;
 }
 return s;
}
function buatStruk(instruction, str) {
 db.ExecuteSql("select * from penjualan;", [], function(rslt) {
   bodi = "";
   Tot = 0;
   strukProfit = 0;
   var i = 0;
   for (; i < rslt.rows.length; i++) {
 
     var r = rslt.rows.item(i);
     pro = padEnd(r.produk.substr(0, 31), " ", 31);

     jum = padEnd(r.jumlah + " " + r.satuan, " ", 7);
     har = padEnd(Number(r.harga).toLocaleString(), " ", 9);
     tot = padFront(Number(r.total).toLocaleString(), " ", 12);
     Tot = Tot + r.total;
     strukProfit = strukProfit + r.profit;
   bodi = bodi + (pro + "\n") + jum + " x " + har + "=" + tot + "\n";
no= 235;
 
  
   }
   var n = padFront(Tot.toLocaleString(), " ", 24);
   var o = padFront(Number(str).toLocaleString(), " ", 26);
   var l = padFront((str - Tot).toLocaleString(), " ", 25);
   edt.SetText(header + "\nNama : " + instruction + "\n" + garis + "\n" + bodi + "\n" + garis + "\nTotal Rp" + n +  "\n" + garis +   "\nID :" + no +  "\n"+ footer);
 });


}
function addToStruk() {
 if (sup.PlayAnim(this, "Bounce"), "" != (produk.GetText() && harga.GetText() && jumlah.GetText())) {
   if (produk.GetText().length > 30) {
     return app.Alert("Agar sesuai dengan ukuran kertas printer, panjang maksimal nama produk adalah 30 huruf"), false;
   }
   var ls_id = produk.GetText();
   var right = jumlah.GetText();
   var left = harga.GetText().replace(".", "");
   var comment2Id = Number(left) * Number(right);
   db.ExecuteSql("select * from produk where nama= '" + ls_id + "';", [], function(rslt) {
     if (rslt.rows.length < 1) {
       db.ExecuteSql("select max(no) as no from produk;", [], function(rslt) {
         no = Number(rslt.rows.item(0).no) + 1;
         db.ExecuteSql("INSERT INTO produk (id,nama,satuan,modal,harga,stok) VALUES (?,?,?,?,?,?)", [no, ls_id, spinSat.GetText(), left, left, "1000"], null, OnError);
         app.SendText("Produk ditambahkan ke daftar barang");
       });
       profit = 0;
     } else {
       mod = rslt.rows.item(0).modal || left;
       profit = right * (Number(left) - mod);
       db.ExecuteSql("update `produk` set stok=stok-" + Number(right) + ", harga='" + left + "', satuan='" + spinSat.GetText() + "' where nama='" + produk.GetText() + "'; ");
     }
     db.ExecuteSql("INSERT INTO penjualan(produk,jumlah,satuan,harga,total,profit) VALUES (?,?,?,?,?,?)", [ls_id, right, spinSat.GetText(), left, comment2Id, profit], null, OnError);
     buatStruk("...", 0);
     produk.SetText("");
     jumlah.SetText("");
     harga.SetText("");
   });
 } else {
   app.Alert("Lengkapi detail pembelian");
 }
}
function editStruk() {
 sup.PlayAnim(this, "Bounce");
 var Modal = app.CreateDialog("Sentuh untuk menghapus");
 Modal.SetBackColor("white");
 layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
 layDlg.SetPadding(0.01, 0,0.01,0.01);
 layDlg.SetBackColor("white");
 Modal.AddLayout(layDlg);
 lstStruk = app.CreateList("", 1,0.6);
 lstStruk.SetBackColor("black");
 lstStruk.SetOnTouch(function(type) {
   db.ExecuteSql("DELETE FROM penjualan WHERE produk='" + type + "';");
   buatStruk("...", 0);
   Modal.Dismiss();
   app.SendText(type + " dihapus");
 });
 layDlg.AddChild(lstStruk);
 db.ExecuteSql("select * from penjualan;", [], function(rslt) {
   var baseUrl = "";
   var i = 0;
   for (; i < rslt.rows.length; i++) {
     var layer = rslt.rows.item(i);
     baseUrl = baseUrl + (layer.produk + ":") + layer.jumlah + " " + layer.satuan + " x " + layer.harga.toLocaleString() + ":null#";
     lstStruk.SetList(baseUrl, "#");
   }
   Modal.Show();
 });
}
function bayar() {
 sup.PlayAnim(this, "Bounce");
 var Modal = app.CreateDialog("Jumlah dibayarkan");
 layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
 layDlg.SetPadding(0.05, 0,0.01,0.01);
 Modal.AddLayout(layDlg);
 namaPembeli = sup.CreateTextEdit("",0.7, null, "floating");
 namaPembeli.SetHint("Nama pembeli (opsional)");
 layDlg.AddChild(namaPembeli);
 jumlahDibayarkan = sup.CreateTextEdit("",0.7, null, "floating,number");
 jumlahDibayarkan.SetHint("Jumlah dibayar");
 layDlg.AddChild(jumlahDibayarkan);
 btnOk = app.CreateButton("Proses",0.8,0.1, "custom");
 btnOk.SetOnTouch(function() {
   sup.PlayAnim(this, "Bounce");
   pembeli = namaPembeli.GetText();
   jmlhDiBayar = jumlahDibayarkan.GetText().replace(/[.,]/g, "");
   buatStruk(pembeli, jmlhDiBayar);
   Modal.Dismiss();
   app.SaveBoolean("Dibayar", true);
 });
 layDlg.AddChild(btnOk);
 Modal.Show();
 sup.PlayAnim(layDlg, "SlideFromBottom");
 app.ShowKeyboard(jumlahDibayarkan);
}
dlgRef = app.CreateDialog("Auto fill", "NoTitle,NoDim,NoFocus"), dlgRef.SetPosition(0.3,0.17);
var layRef = app.CreateLayout("linear", "vertical,fillxy,left");
layRef.SetPadding(0.02, 0,0.02,0.02), dlgRef.AddLayout(layRef);
var list = "";
lstRef = app.CreateList(list,0.7,0.4), lstRef.SetOnTouch(function(value, nameOfRoute, canCreateDiscussions, isSlidingUp) {
 produk.SetText(value);
 harga.SetText(nameOfRoute.split("/")[0]);
 jumlah.SetText("1");
 btnAddToStruk.SetVisibility("show");
 app.ShowKeyboard("SatuanAktif", nameOfRoute.split("/")[1]);
 spinSat.SelectItem(nameOfRoute.split("/")[1].toUpperCase());
 dlgRef.Dismiss();
}), layRef.AddChild(lstRef);