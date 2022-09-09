function add(x) {
    //x.preventDefault();
    var t = document.querySelector("#it"),
        a = document.querySelector("#ia"),
        y = document.querySelector("#iy"),
        s = document.querySelector("#is"),
        c = {
            id: +new Date,
            title: t.value,
            author: a.value,
            year: y.value,
            isComplete: s.checked
        };
    var item = JSON.parse(localStorage.getItem("books"));
    if(item==null){item=[]}
    //console.log(item);
    item.push(c);
    localStorage.setItem("books", JSON.stringify(item));
    Toast.fire({icon: 'success',title: 'Buku berhasil ditambahkan'})
    load();
}

function edit(id,val){
    var item = JSON.parse(localStorage.getItem("books"));
    const index = item.findIndex(it => it.id == id);
    item[index].isComplete=val;
    //console.log(item)
    localStorage.setItem("books", JSON.stringify(item));
    Toast.fire({icon: 'success',title: 'Buku berhasil dipindahkan'})
    load();
}

function remove(id){
    var item = JSON.parse(localStorage.getItem("books"));
    const index = item.findIndex(it => it.id == id);
    item.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(item));
    Toast.fire({icon: 'success',title: 'Buku berhasil dihapus'})
    load();
}

function wipe(){
    var item = JSON.parse(localStorage.getItem("books"));
    if(item.length==0){
        swal('Oops!', 'Tidak ada buku untuk dihapus', 'error')
    }
    else{
        localStorage.setItem("books", "[]");
        Toast.fire({icon: 'success',title: 'Semua buku berhasil dihapus'})
        load();  
    }
}

function load(params){
    var words = "";
    if(params){words = params;}
    var item = JSON.parse(localStorage.getItem("books"));
    if(item){var size = item.length;}
    const bi = document.querySelector("#bIncomplete");  bi.innerHTML = ""; 
    const bc = document.querySelector("#bComplete");    bc.innerHTML = "";
    var vc="",vi="";
    var no=0;
    //console.log(item)
    for (var i = 0; i < size; i++) {
        if(!item[i].isComplete&&item[i].title.includes(words)){
            vi +=  '<div id="'+item[i].id+'"class="row">'
            vi +=      '<div class="row wfa form-control">'
            vi +=          '<p class="judul my-auto">'+item[i].title+' ('+item[i].year+') by '+item[i].author+'</p>'
            vi +=      '</div>'
            vi +=      '<button class="form-control btn-success" onclick="edit('+item[i].id+',true)"><p class="wmc">Selesai dibaca</p></button>'
            vi +=      '<button class="form-control btn-danger" onclick="remove('+item[i].id+')"><p>Hapus</p></button>'
            vi +=  '</div>'
            no++
        }else if(item[i].title.includes(words)) {
            vc +=  '<div id="'+item[i].id+'"class="row">'
            vc +=      '<div class="row wfa form-control">'
            vc +=          '<p class="judul my-auto">'+item[i].title+' ('+item[i].year+') by '+item[i].author+'</p>'
            vc +=      '</div>'
            vc +=      '<button class="form-control btn-success" onclick="edit('+item[i].id+',false)"><p class="wmc">Belum Selesai dibaca</p></button>'
            vc +=      '<button class="form-control btn-danger" onclick="remove('+item[i].id+')"><p>Hapus</p></button>'
            vc +=  '</div>'
            no++
        }
    }
    bi.innerHTML = vi, bc.innerHTML = vc;
    document.querySelector("#total").textContent="Total : "+no;
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

load()