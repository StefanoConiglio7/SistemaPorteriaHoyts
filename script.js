const salasypeliculas = () => JSON.parse(localStorage.getItem('salasypeliculas')) || []
const cambiodeposters= ()=> JSON.parse(localStorage.getItem("cambiodeposters")) || []
const ingreso = () => JSON.parse(localStorage.getItem("ingreso")) || []
const egreso = () => JSON.parse(localStorage.getItem("egreso")) || []
function principal() {
    function SalasyPeliculas() {
        
        function renderizarEncabezado(roomsandmovies,roomname,movies,button,divbuttons) {
            roomsandmovies.innerHTML = ""
            const h1 = document.createElement("h1")
            h1.innerText= "Salas y Peliculas"
            divbuttons.appendChild(h1)
            divbuttons.appendChild(roomname)
            divbuttons.appendChild(movies)
            divbuttons.appendChild(button)
            roomsandmovies.appendChild(divbuttons)
        }
    
        function renderizarSyP() {
            const roomsandmovies = document.getElementById("SalasyPeliculas")
            const roomname = document.createElement("input")
            roomname.type = "text"
            roomname.name = "Roomname"
            roomname.placeholder = "Ingrese la Sala"
            const divbuttons= document.createElement("div")
            divbuttons.className= "divinputs"
            const movies = document.createElement("textarea")
            movies.placeholder="Ingrese las peliculas"
            movies.name = "Moviesname"
            movies.rows = "4"
            movies.cols = "50"
            
            const button = document.createElement("button")
            button.textContent = "Agregar Sala y Películas"
            button.id = "roomsandmovies"
            
            button.addEventListener("click", () => CrearSalaYPeliculas(roomname, movies, roomsandmovies))
            
            renderizarEncabezado(roomsandmovies,roomname,movies,button,divbuttons);
            listarSalasYPeliculas(roomsandmovies)
        }
        function CrearSalaYPeliculas(roomname, movies, roomsandmovies) {
            if (!roomname.value.trim() || !movies.value.trim()) {
                alert("Por favor, completa todos los campos.")
                return
            }
            
            const storedData = salasypeliculas()
            storedData.push({
                roomname: roomname.value.charAt(0).toLocaleUpperCase() + roomname.value.slice(1).toLocaleLowerCase(),
                movies: movies.value,
                id: Date.now()
            })
            localStorage.setItem("salasypeliculas", JSON.stringify(storedData))
    
            roomname.value = ""; 
            movies.value = ""; 
    
            listarSalasYPeliculas(roomsandmovies)
        }
    
        function listarSalasYPeliculas(roomsandmovies) {
            const storedData = salasypeliculas()
            const existingRooms = roomsandmovies.querySelectorAll('.roomandmovies');
            existingRooms.forEach(room => room.remove());
            storedData.forEach(data => {
                const room = document.createElement("div")
                room.className = "roomandmovies"
                room.setAttribute("data-id", data.id)

                const h2 = document.createElement("h2")
                h2.className = "room"
                h2.textContent = data.roomname
                h2.contentEditable= true
    
                const textarea = document.createElement("textarea")
                textarea.className = "movies"
                textarea.value = data.movies
                
                const eliminar = document.createElement("button")
                eliminar.textContent = "X"
                eliminar.id= data.id

                eliminar.addEventListener("click",(e)=>Eliminar(e,roomsandmovies))
                h2.addEventListener("input", () => {
                    const id = room.getAttribute("data-id")
                    CambiarContenido(id, h2, textarea)
                })
                textarea.addEventListener("input", () => {
                    const id = room.getAttribute("data-id")
                    CambiarContenido(id, h2, textarea)
                })
                room.appendChild(eliminar)
                room.appendChild(h2)
                room.appendChild(textarea)
                roomsandmovies.appendChild(room)
            })
            function Eliminar(e, roomsandmovies) {
                const id= Number(e.target.id)
                const storedData = salasypeliculas()
                const filtrado= storedData.filter(data =>data.id !== id)
                localStorage.setItem("salasypeliculas", JSON.stringify(filtrado))
                listarSalasYPeliculas(roomsandmovies)
                
            }
    
            function CambiarContenido(id, h2, textarea) {
                const data = salasypeliculas()
                const index = data.findIndex(d => d.id === Number(id))
                if (index !== -1) {
                    data[index].roomname = h2.textContent
                    data[index].movies = textarea.value
                }
                localStorage.setItem("salasypeliculas", JSON.stringify(data))
            }
        }
    
        renderizarSyP()
    }
    function CambiodePosters() {
        
        function renderizarEncabezadoPosters(roomsandposters,roomname,movies,button,divinputs) {
            roomsandposters.innerHTML = "";
            const h1= document.createElement("h1")
            h1.innerText="Cambio de Posters"
            divinputs.appendChild(h1)
            divinputs.appendChild(roomname);
            divinputs.appendChild(movies);
            divinputs.appendChild(button);
            roomsandposters.appendChild(divinputs)
        }
        
        function renderizarP() {
            const roomsandposters = document.getElementById("CambiodePosters");
            const divbuttons= document.createElement("div")
            divbuttons.className="divinputsC"
            const roomname = document.createElement("input");
            roomname.type = "text";
            roomname.name = "Roomname";
            roomname.placeholder = "Ingrese la Sala";
        
            const movies = document.createElement("textarea");
            movies.placeholder= "Ingrese los cambios"
            movies.name = "Moviesname";
            movies.rows = "4";
            movies.cols = "50";
        
            const button = document.createElement("button");
            button.textContent = "Agregar Sala y Posters";
            button.id = "roomsandmovies";
        
            button.addEventListener("click", () => CrearSalaYPosters(roomname, movies, roomsandposters));
        
            renderizarEncabezadoPosters(roomsandposters,roomname,movies,button,divbuttons)
            listarSalasYPosters(roomsandposters);
        }
        
        function CrearSalaYPosters(roomname, movies, roomsandposters) {
            if (!roomname.value.trim() || !movies.value.trim()) {
                alert("Por favor, completa todos los campos.");
                return;
            }
        
            const storedData = cambiodeposters();
            storedData.push({
                roomname: roomname.value.charAt(0).toLocaleUpperCase() + roomname.value.slice(1).toLocaleLowerCase(),
                movies: movies.value,
                id: Date.now(),
            });
            localStorage.setItem("cambiodeposters", JSON.stringify(storedData));
        
            roomname.value = ""; 
            movies.value = ""; 
        
            listarSalasYPosters(roomsandposters); 
        }
        
        function listarSalasYPosters(roomsandposters) {
            const storedData = cambiodeposters();
            const existingRooms = roomsandposters.querySelectorAll('.roomandposters');
            existingRooms.forEach(room => room.remove());
            storedData.forEach((data) => {
                const room = document.createElement("div");
                room.className = "roomandposters";
                room.setAttribute("data-id", data.id);
        
                const h2 = document.createElement("h2");
                h2.className = "roomp";
                h2.textContent = data.roomname;
                h2.contentEditable = true;
        
                const textarea = document.createElement("textarea");
                textarea.className = "movies";
                textarea.value = data.movies;

                const eliminar = document.createElement("button");
                eliminar.textContent = "X";
                eliminar.id = data.id;
                
                eliminar.addEventListener("click", (e) => Eliminar(e, roomsandposters));
                h2.addEventListener("input", () => {
                    const id = room.getAttribute("data-id");
                    CambiarContenidoPoster(id, h2, textarea);
                })
                textarea.addEventListener("input", () => {
                    const id = room.getAttribute("data-id");
                    CambiarContenidoPoster(id, h2, textarea);
                })
                
                room.appendChild(eliminar);
                room.appendChild(h2);
                room.appendChild(textarea);
                roomsandposters.appendChild(room);
            });
        }
        function Eliminar(e, roomsandposters) {
            const id= Number(e.target.id)
            const storedData = cambiodeposters()
            const filtrado= storedData.filter(data =>data.id !== id)
            localStorage.setItem("cambiodeposters", JSON.stringify(filtrado))
            listarSalasYPosters(roomsandposters)
        }
        
        function CambiarContenidoPoster(id, h2, textarea) {
            const data = cambiodeposters();
            const index = data.findIndex((d) => d.id === Number(id));
            if (index !== -1) {
                data[index].roomname = h2.textContent;
                data[index].movies = textarea.value;
                localStorage.setItem("cambiodeposters", JSON.stringify(data));
            }
        }
        renderizarP();
    }
    function CrearFooter() {
        const footer = document.createElement("footer");
        footer.id = "footer";
        const horarios= document.getElementById("Horarios")
        const span = document.createElement("span");
        span.textContent = "© 2025 Proyecto desarrollado y promovido por Hoyts Nuevocentro";
        footer.appendChild(span);
        horarios.after(footer)
    }
    function Horariosingreso() {
        function renderizarH() {
            const income= document.getElementById("Ingreso")
            const h2 = document.createElement("h2")
            h2.innerText="Ingresos"
            const button= document.createElement("button")
            const div= document.createElement("div")
            div.className= "buttons"
            button.innerText="Agregar Horario de Ingreso"
            income.appendChild(h2)
            income.appendChild(button)
            income.appendChild(div)
            button.addEventListener("click",()=> crearhorarioI(income,button))
            agregar(div)
            listarhorarioI(income,button)
        }
        function agregar(div) {
            const inputsN= document.createElement("button")
            inputsN.innerText="Reiniciar Salas"
            const inputsT= document.createElement("button")
            inputsT.innerText="Reiniciar Horarios"
            const checks= document.createElement("button")
            checks.innerText="Reiniciar Checks"
            checks.addEventListener("click",()=> ReiniciarC())
            inputsN.addEventListener("click",()=> ReiniciarN())
            inputsT.addEventListener("click",()=> ReiniciarT())
            div.appendChild(inputsN)
            div.appendChild(inputsT)
            div.appendChild(checks)
        }
        function ReiniciarC() {
            const storedData = ingreso();
            storedData.forEach(data => data.checkbox = false);
            localStorage.setItem("ingreso", JSON.stringify(storedData));
            document.querySelectorAll(".roomanddate input[type='checkbox']").forEach(checkbox => {
                checkbox.checked = false;
            });
        }
        function ReiniciarN() {
            const storedData = ingreso();
            storedData.forEach(data => data.inputnumber = "");
            localStorage.setItem("ingreso", JSON.stringify(storedData));
            document.querySelectorAll(".roomanddate input[type='number']").forEach(inputnumber => {
                inputnumber.value = "";
            });
        }
        function ReiniciarT() {
            const storedData = ingreso();
            storedData.forEach(data => data.inputtime = "");
            localStorage.setItem("ingreso", JSON.stringify(storedData));
            document.querySelectorAll(".roomanddate input[type='time']").forEach(inputtime => {
                inputtime.value = "";
            });
        }
        function crearhorarioI(income,button) {
            const storedData= ingreso()
            storedData.push({
                id: Date.now(),
                inputnumber: "",
                inputtime: "",
                checkbox: false
            })
            localStorage.setItem("ingreso",JSON.stringify(storedData))
            listarhorarioI(income,button)
        }
        function listarhorarioI(income,button) {
            const storedData= ingreso()
            const existingRooms= income.querySelectorAll(".roomanddate")
            existingRooms.forEach(room=> room.remove())
            storedData.forEach((data)=>{
                const room= document.createElement("div")
                room.className= "roomanddate"
                room.setAttribute("data-id",data.id)
                const inputnumber= document.createElement("input")
                inputnumber.type= "number"
                inputnumber.placeholder="Sala N°"
                inputnumber.min= "1"
                inputnumber.value= data.inputnumber
                const inputtime= document.createElement("input")
                inputtime.type="time"
                inputtime.value= data.inputtime
                const checkbox= document.createElement("input")
                checkbox.type= "checkbox"
                checkbox.checked= data.checkbox
                const eliminar= document.createElement("button")
                eliminar.innerText="X"
                eliminar.id= data.id
                eliminar.addEventListener("click",(e)=> Eliminar(e,income,button))
                inputnumber.addEventListener("input",()=>{
                    const id= room.getAttribute("data-id")
                    CambiarContenidoN(id,inputnumber)
                })
                inputtime.addEventListener("input",()=>{
                    const id= room.getAttribute("data-id")
                    CambiarContenidoT(id,inputtime)
                })
                checkbox.addEventListener("change",()=>{
                    const id= room.getAttribute("data-id")
                    CambiarContenidoC(id,checkbox)
                })
                room.appendChild(inputnumber)
                room.appendChild(inputtime)
                room.appendChild(checkbox)
                room.appendChild(eliminar)
                income.insertBefore(room,button)
            })
        }
        function Eliminar(e,income,button) {
            const id= Number(e.target.id)
            const storedData = ingreso()
            const filtrado= storedData.filter(data =>data.id !== id)
            localStorage.setItem("ingreso", JSON.stringify(filtrado))
            listarhorarioI(income,button)
        }
        function CambiarContenidoN(id, inputnumber) {
            const data = ingreso();
            const index = data.findIndex((d) => d.id === Number(id));
            if (index !== -1) {
                if (Number(inputnumber.value)<=0) {
                    inputnumber.value= 1
                    return
                }
                data[index].inputnumber = inputnumber.value;
                localStorage.setItem("ingreso", JSON.stringify(data));
            }
        }
        function CambiarContenidoT(id,inputtime) {
            const data = ingreso();
            const index = data.findIndex((d) => d.id === Number(id));
            if (index !== -1) {
                data[index].inputtime = inputtime.value;
                localStorage.setItem("ingreso", JSON.stringify(data));
            }
        }
        function CambiarContenidoC(id,checkbox) {
            const data = ingreso();
            const index = data.findIndex((d) => d.id === Number(id));
            if (index !== -1) {
                data[index].checkbox= checkbox.checked
                localStorage.setItem("ingreso", JSON.stringify(data));
            }
        }
        renderizarH()
    }
    function horariosegreso() {
        function renderizarH() {
            const income= document.getElementById("Egreso")
            const h2 = document.createElement("h2")
            h2.innerText="Egresos"
            const button= document.createElement("button")
            const div= document.createElement("div")
            div.className= "buttons"
            button.innerText="Agregar Horario de Egreso"
            income.appendChild(h2)
            income.appendChild(button)
            income.appendChild(div)
            button.addEventListener("click",()=> crearhorarioE(income,button))
            agregar(div)
            listarhorarioE(income,button)
        }
        function agregar(div) {
            const inputsN= document.createElement("button")
            inputsN.innerText="Reiniciar Salas"
            const inputsT= document.createElement("button")
            inputsT.innerText="Reiniciar Horarios"
            const checks= document.createElement("button")
            checks.innerText="Reiniciar Checks"
            checks.addEventListener("click",()=> ReiniciarC())
            inputsN.addEventListener("click",()=> ReiniciarN())
            inputsT.addEventListener("click",()=> ReiniciarT())
            div.appendChild(inputsN)
            div.appendChild(inputsT)
            div.appendChild(checks)
        }
        function ReiniciarC() {
            const storedData = egreso();
            storedData.forEach(data => data.checkbox = false);
            localStorage.setItem("egreso", JSON.stringify(storedData));
            document.querySelectorAll(".roomanddate2 input[type='checkbox']").forEach(checkbox => {
                checkbox.checked = false;
            });
        }
        function ReiniciarN() {
            const storedData = egreso();
            storedData.forEach(data => data.inputnumber = "");
            localStorage.setItem("egreso", JSON.stringify(storedData));
            document.querySelectorAll(".roomanddate2 input[type='number']").forEach(inputnumber => {
                inputnumber.value = "";
            });
        }
        function ReiniciarT() {
            const storedData = egreso();
            storedData.forEach(data => data.inputtime = "");
            localStorage.setItem("egreso", JSON.stringify(storedData));
            document.querySelectorAll(".roomanddate2 input[type='time']").forEach(inputtime => {
                inputtime.value = "";
            });
        }
        function crearhorarioE(income,button) {
            const storedData= egreso()
            storedData.push({
                id: Date.now(),
                inputnumber: "",
                inputtime: "",
                checkbox: false
            })
            localStorage.setItem("egreso",JSON.stringify(storedData))
            listarhorarioE(income,button)
        }
        function listarhorarioE(income,button) {
            const storedData= egreso()
            const existingRooms= income.querySelectorAll(".roomanddate2")
            existingRooms.forEach(room=> room.remove())
            storedData.forEach((data)=>{
                const room= document.createElement("div")
                room.className= "roomanddate2"
                room.setAttribute("data-id",data.id)
                const inputnumber= document.createElement("input")
                inputnumber.type= "number"
                inputnumber.placeholder="Sala N°"
                inputnumber.min= "1"
                inputnumber.value= data.inputnumber
                const inputtime= document.createElement("input")
                inputtime.type="time"
                inputtime.value= data.inputtime
                const checkbox= document.createElement("input")
                checkbox.type= "checkbox"
                checkbox.checked= data.checkbox
                const eliminar= document.createElement("button")
                eliminar.innerText="X"
                eliminar.id= data.id
                eliminar.addEventListener("click",(e)=> Eliminar(e,income,button))
                inputnumber.addEventListener("input",()=>{
                    const id= room.getAttribute("data-id")
                    CambiarContenidoN(id,inputnumber)
                })
                inputtime.addEventListener("input",()=>{
                    const id= room.getAttribute("data-id")
                    CambiarContenidoT(id,inputtime)
                })
                checkbox.addEventListener("change",()=>{
                    const id= room.getAttribute("data-id")
                    CambiarContenidoC(id,checkbox)
                })
                room.appendChild(inputnumber)
                room.appendChild(inputtime)
                room.appendChild(checkbox)
                room.appendChild(eliminar)
                income.insertBefore(room,button)
            })
        }
        function Eliminar(e,income,button) {
            const id= Number(e.target.id)
            const storedData = egreso()
            const filtrado= storedData.filter(data =>data.id !== id)
            localStorage.setItem("egreso", JSON.stringify(filtrado))
            listarhorarioE(income,button)
        }
        function CambiarContenidoN(id, inputnumber) {
            const data = egreso();
            const index = data.findIndex((d) => d.id === Number(id));
            if (index !== -1) {
                if (Number(inputnumber.value)<=0) {
                    inputnumber.value= 1
                    return
                }
                data[index].inputnumber = inputnumber.value;
                localStorage.setItem("egreso", JSON.stringify(data));
            }
        }
        function CambiarContenidoT(id,inputtime) {
            const data = egreso();
            const index = data.findIndex((d) => d.id === Number(id));
            if (index !== -1) {
                data[index].inputtime = inputtime.value;
                localStorage.setItem("egreso", JSON.stringify(data));
            }
        }
        function CambiarContenidoC(id,checkbox) {
            const data = egreso();
            const index = data.findIndex((d) => d.id === Number(id));
            if (index !== -1) {
                data[index].checkbox= checkbox.checked
                localStorage.setItem("egreso", JSON.stringify(data));
            }
        }
        renderizarH()
    }
    Horariosingreso()
    horariosegreso()
    CrearFooter();  
    SalasyPeliculas();
    CambiodePosters()
}
principal()