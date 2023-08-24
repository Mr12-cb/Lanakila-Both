
function inputProduk() {
 app.CloseDrawer("left");
 var krusovice = app.CreateDialog("Masukan detail produk");
 layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
 //layDlg.SetBackColor("black");
 layDlg.SetPadding(0.03,0.05,0.03,0.01);
 krusovice.AddLayout(layDlg);
 inputIDProduk = app.CreateTextEdit("",0.8, null, "floating,number,singleline");
 inputIDProduk.SetHint("Kode produk (opsional)");
 layDlg.AddChild(inputIDProduk);
 inputNamaProduk = app.CreateTextEdit("",0.8, null, "floating,singleline");
 inputNamaProduk.SetHint("Nama produk");
 layDlg.AddChild(inputNamaProduk);
 inputSatuanProduk = app.CreateSpinner(spinnerSatuan,0.8,0.1);
 layDlg.AddChild(inputSatuanProduk);
 inputModal = app.CreateTextEdit("",0.8, null, "floating,number,singleline");
 layDlg.AddChild(inputModal);
 inputModal.SetHint("Harga modal");
 inputHargaProduk = app.CreateTextEdit("",0.8, null, "floating,number,singleline");
 layDlg.AddChild(inputHargaProduk);
 inputHargaProduk.SetHint("Harga jual per satuan");
 inputStokProduk = app.CreateTextEdit("",0.8, null, "floating,number,singleline");
 inputStokProduk.SetHint("Stok produk");
 layDlg.AddChild(inputStokProduk);
 btnSimpanProduk = app.CreateButton("Simpan",0.8,0.1, "custom");
 btnSimpanProduk.SetOnTouch(simpanProduk);
 layDlg.AddChild(btnSimpanProduk);
 krusovice.Show();
}
function simpanProduk() {
 var response = inputIDProduk.GetText();
 var query = inputNamaProduk.GetText();
 if (query.length > 30) {
   return app.Alert("Nama produk maksimal 30 karakter"), false;
 }
 var iter_legs = inputSatuanProduk.GetText();
 var rev = inputHargaProduk.GetText().replace(",", "").replace(".", "");
 var boardId = inputStokProduk.GetText();
 var commentId = inputModal.GetText();
 if ("" != response) {
   db.ExecuteSql("select * from produk where id=" + inputIDProduk.GetText() + ";", [], function(selectRes) {
     if (selectRes.rows.length > 0) {
       return app.Alert("Kode produk sudah ada"), false;
     }
     db.ExecuteSql("INSERT INTO produk (id,nama,satuan,modal,harga,stok) VALUES (?,?,?,?,?,?)", [response, query, iter_legs, commentId, rev, boardId], null, OnError);
     app.LoadText("Produk tersimpan");
   });
 } else {
   db.ExecuteSql("select max(no) as no from produk;", [], function(rslt) {
     no = Number(rslt.rows.item(0).no) + 1;
     db.ExecuteSql("INSERT INTO produk (id,nama,satuan,modal,harga,stok) VALUES (?,?,?,?,?,?)", [no, query, iter_legs, commentId, rev, boardId], null, OnError);
     app.LoadText("Produk tersimpan");
   });
 }
}
function lihatStokProduk() {
 db.ExecuteSql("select count(no) as total from produk;", [], function(rslt) {
   totalItem = rslt.rows.item(0).total;
 });
 db.ExecuteSql("select *  from produk order by nama asc limit 50", [], function(rslt) {
   dlgTxt = app.CreateDialog("Stok Produk : " + totalItem + "item");
   dlgTxt.SetBackColor("white");
   layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
   layDlg.SetPadding(0.02,0.01,0.02,0.01);
   layDlg.SetBackColor("white");
   dlgTxt.AddLayout(layDlg);
   txt = app.CreateTextEdit("", 1,0.08);
   txt.SetHint("Cari Produk ");
   txt.SetTextColor("Black");
   txt.SetOnChange(function() {
     db.ExecuteSql("select * from produk where nama like '" + this.GetText() + "%' order by nama;", [], function(rslt) {
       var html = "";
       var imagesLen = rslt.rows.length;
       var j = 0;
       for ( ;j < imagesLen; j++) {
         var d = rslt.rows.item(j);
         for ( ;String(d.nama).length < 22;) {
           d.nama += " ";
         }
         for (; String(d.id).length < 20;) {
           d.id += " ";
         }
         for ( ;String(d.harga).length < 7;) {
           d.harga += " ";
         }
         for ( ;String(d.stok).length < 4;) {
           d.stok += " ";
         }
         html = html + (d.id + "\n!!") + d.nama + d.harga + d.stok + d.satuan + "!!null#";
       }
       html = html.replace(/:/g, "^c^").replace(/!!/g, ":");
       lstStok.SetList(html, "#");
     });
   });
   layDlg.AddChild(txt);
   lstStok = app.CreateList("", 1,0.7, "MonoSpaced");
   lstStok.SetBackColor("");
   lstStok.SetTextSize(18);
   lstStok.SetTextSize2(14);
   lstStok.SetPadding(0.01,0.03,0.01,0.02);
   lstStok.SetOnTouch(function(canCreateDiscussions) {
     lstPilihan = app.CreateListDialog("Aksi", "Edit,Hapus,QR Code");
     lstPilihan.SetBackColor("black");
     lstPilihan.produk = canCreateDiscussions;
     lstPilihan.SetOnTouch(function(canCreateDiscussions) {
       if ("Edit" == canCreateDiscussions) {
         editStok(lstPilihan.produk);
       }
       if ("Hapus" == canCreateDiscussions) {
         hapusStok(lstPilihan.produk);
       }
       if ("QR Code" == canCreateDiscussions) {
         showQRCodeMaker(lstPilihan.produk);
       }
     });
     lstPilihan.Show();
   });
   layDlg.AddChild(lstStok);
   var html = "";
   var imagesLen = rslt.rows.length;
   var j = 0;
   for (; j < imagesLen; j++) {
     var d = rslt.rows.item(j);
     for ( ;String(d.nama).length < 22;) {
       d.nama += " ";
     }
     for ( ;String(d.id).length < 20;) {
       d.id += " ";
     }
     for ( ;String(d.harga).length < 7;) {
       d.harga += " ";
     }
     for ( ;String(d.stok).length < 4;) {
       d.stok += " ";
     }
     html = html + (d.id + "\n!!") + d.nama + d.harga + d.stok + d.satuan + "!!null#";
   }
   html = html.replace(/:/g, "^c^").replace(/!!/g, ":");
   lstStok.SetList(html, "#");
   dlgTxt.Show();
 });
}
function hapusStok(selectedAirline) {
 lstStok.RemoveItem(selectedAirline);
 db.ExecuteSql("DELETE FROM produk WHERE id=" + Number(selectedAirline.split("^n^")[0].trim()));
 app.LoadText("Data terhapus. Untuk menghapus semua data sekaligus silahkan masuk pengaturan dan pilih reset produk");
}
function editStok(eventStr, a, ud, un) {
 dlgTxt.Dismiss();
 db.ExecuteSql("select * from produk where id=" + eventStr + ";", [], function(rslt) {
   var options = rslt.rows.item(0);
   dlgTxt = app.CreateDialog("Ubah detail produk");
   layDlg = app.CreateLayout("linear", "vertical,fillxy,left");
   layDlg.SetBackColor("black");
   layDlg.SetPadding(0.03,0.05,0.03,0.01);
   dlgTxt.AddLayout(layDlg);
   app.CreateCheckBox("NoProduk", options.no);
   inputIDProduk = app.CreateTextEdit(options.id,0.8, null, "floating,number,singleline");
   inputIDProduk.SetHint("kode produk");
   layDlg.AddChild(inputIDProduk);
   inputNamaProduk = app.CreateTextEdit(options.nama,0.8, null, "floating,singleline");
   inputNamaProduk.SetHint("Nama produk");
   layDlg.AddChild(inputNamaProduk);
   inputSatuanProduk = app.CreateSpinner(spinnerSatuan,0.8,0.1);
   inputSatuanProduk.SelectItem(options.satuan);
   layDlg.AddChild(inputSatuanProduk);
   inputModal = app.CreateTextEdit(options.modal || options.harga,0.8, null, "floating,number,singleline");
   layDlg.AddChild(inputModal);
   inputModal.SetHint("Harga modal");
   inputHargaProduk = app.CreateTextEdit(options.harga,0.8, null, "floating,number,singleline");
   layDlg.AddChild(inputHargaProduk);
   inputHargaProduk.SetHint("Harga jual per satuan");
   inputStokProduk = app.CreateTextEdit(options.stok,0.8, null, "floating,number,singleline");
   inputStokProduk.SetHint("Stok produk");
   layDlg.AddChild(inputStokProduk);
   btnSimpanProduk = app.CreateButton("Simpan",0.8,0.1, "custom");
   btnSimpanProduk.SetOnTouch(updateProduk);
   layDlg.AddChild(btnSimpanProduk);
   dlgTxt.Show();
 });
}
function updateProduk() {
 var t = inputIDProduk.GetText();
 var a = app.LoadNumber("NoProduk", "1");
 var expRecords = inputNamaProduk.GetText();
 if (expRecords.length > 30) {
   return app.Alert("Nama produk maksimal 30 karakter"), false;
 }
 var l = inputSatuanProduk.GetText();
 var retryLinkHref = inputHargaProduk.GetText().replace(",", "").replace(".", "");
 var o = inputStokProduk.GetText();
 var u = inputModal.GetText();
 db.ExecuteSql("update produk set id='" + t + "', nama='" + expRecords + "',satuan='" + l + "',modal='" + u + "',harga='" + retryLinkHref + "',stok='" + o + "' where no=" + a + ";");
 app.LoadText("Produk diperbarui");
 dlgTxt.Dismiss();
 lihatStokProduk();
}
function OnError(error) {
 app.Alert("Gagal import database : " + error);
 app.HideProgress();
}