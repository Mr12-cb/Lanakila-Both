
function DecodeFromCamera(canCreateDiscussions) {
 if (canCreateDiscussions) {
   var c = reader.Decode(cam);
   if (null != c) {
     app.GetPairedBTDevices("0,100,30,100,50,300");
     produk.SetText(c.content);
     db.ExecuteSql("select * from produk where nama = '" + c.content + "' or  id= '" + c.content + "';", [], function(e) {
       produk.SetText(e.rows.item(0).nama);
       harga.SetText(e.rows.item(0).harga);
       app.SaveText("SatuanAktif", e.rows.item(0).satuan.toUpperCase());
     });
     setTimeout("DecodeFromCamera(true);", 200);
   }
 }
}