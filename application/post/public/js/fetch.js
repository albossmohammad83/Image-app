var count = 0;
var form = document.getElementById('form');

form.addEventListener('submit', e => {
    e.preventDefault();

    fetch();

});

function fetch() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
        var x = JSON.parse(this.responseText);
        count = x.length;
        document.getElementById("count").innerHTML = `${count} Photos`;
        x.forEach((obj) => {
        document.getElementById("demo").innerHTML
                        += `<div id=${obj.id} class="gallery" onclick="fadeOut(${obj.id})">
        <img src=${obj.url} width="200px" height="200px" />
        <div class="desc">${obj.title}</div>
        </div>`;
                    });
            }
    };

   req.open(
    "GET",
    "https://jsonplaceholder.typicode.com/albums/2/photos",
    true
    );
    req.send();
}

function fadeOut(id) {
    var element = document.getElementById(id);
    var op = 1;
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.remove();
            count--;
            document.getElementById("count").innerHTML = `<div>${count} Photos</div>`;
        }
        element.style.opacity = op;
        op -= 0.1; }, 50);

}
