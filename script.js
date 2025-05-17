const egreso = () => JSON.parse(localStorage.getItem("egreso")) || []
function principal() {
    function CrearFooter() {
        const footer = document.createElement("footer");
        footer.id = "footer";
        const horarios= document.getElementById("Horarios")
        const span = document.createElement("span");
        span.textContent = "© 2025 Proyecto desarrollado y promovido por Servicios Hoyts Nuevocentro";
        footer.appendChild(span);
        horarios.after(footer)
    }
    function Horariosegreso() {
        function renderdiv(div2) {
            const salas = document.createElement("h2")
            salas.innerText="Salas"
            salas.className= "salas"
            const peliculas = document.createElement("h2")
            peliculas.innerText="Peliculas"
            peliculas.className= "peliculas"
            const idiomas = document.createElement("h2")
            idiomas.innerText="Idiomas"
            idiomas.className= "idiomas"
            const formatos = document.createElement("h2")
            formatos.innerText="Formatos"
            formatos.className= "formatos"
            const clasificaciones = document.createElement("h2")
            clasificaciones.innerText="Apto"
            clasificaciones.className= "clasificaciones"
            const inicio = document.createElement("h2")
            inicio.innerText="Inicio"
            inicio.className= "inicio"
            const fin = document.createElement("h2")
            fin.className= "fin"
            fin.innerText="Fin"
            div2.appendChild(salas)
            div2.appendChild(peliculas)
            div2.appendChild(idiomas)
            div2.appendChild(formatos)
            div2.appendChild(clasificaciones)
            div2.appendChild(inicio)
            div2.appendChild(fin)
        }
        function renderizarH() {
            const income= document.getElementById("Egreso")
            const div2= document.createElement("div")
            const button= document.createElement("button")
            const div= document.createElement("div")
            div.className= "buttons"
            button.innerText="Agregar Funcion"
            button.className= "agregar"
            const rooms = document.querySelectorAll(".roomanddate2")
            income.appendChild(div2)
            income.appendChild(button)
            income.appendChild(div)
            button.addEventListener("click",()=> {
                div2.className = "div2"
                crearhorarioE(income,button)
            })
            renderdiv(div2)
            agregar(div)
            listarhorarioE(income,button)
            setTimeout(() => {
                div2.className = document.querySelectorAll(".roomanddate2").length ? "div2" : "oculto";
            }, 100);
        }
        function agregar(div) {
            const inputsT= document.createElement("button")
            inputsT.innerText="Limpiar Todo"
            const checks= document.createElement("button")
            checks.innerText="Limpiar Checks"
            checks.addEventListener("click",()=> ReiniciarC())
            inputsT.addEventListener("click",()=>ReiniciarTodo())
                
            div.appendChild(inputsT)
            div.appendChild(checks)
        }
        function ReiniciarC() {
            const storedData = egreso();
            const rooms = document.querySelectorAll(".roomanddate2");

            storedData.forEach((data, index) => {
                data.checkbox = false;

                const currentRoom = rooms[index];
                if (!currentRoom) return;

                const currentCheckbox = currentRoom.querySelector("input[type='checkbox']");
                const currentNumberInput = currentRoom.querySelector("input[type='number']");
                const currentTextInput = currentRoom.querySelector("input[type='text']");
                const currentSelect = currentRoom.querySelectorAll("select");
                const timeInputs = currentRoom.querySelectorAll("input[type='time']");
                document.querySelectorAll(".cambiodeposters").forEach(button => {
                    button.disabled = false;
                });


                if (data.posterChanged) {
                    if (currentNumberInput) {
                        currentNumberInput.classList.remove("number2");
                        currentNumberInput.classList.add("all");
                        currentNumberInput.placeholder = "Sala N°";
                    }
                    if (currentTextInput) {
                        currentTextInput.classList.remove("text2");
                        currentTextInput.classList.add("all");
                        currentTextInput.placeholder = "Película";
                    }
                    currentSelect.forEach(select => {
                        select.classList.remove("select2");
                        select.classList.add("all");
                    });
                    timeInputs.forEach(timeInput => {
                        timeInput.classList.remove("time2");
                        timeInput.classList.add("all");
                    });
                } else {
                    if (currentNumberInput) {
                        currentNumberInput.classList.remove("number2");
                        currentNumberInput.classList.add("number");
                        currentNumberInput.placeholder = "Sala N°";
                    }
                    if (currentTextInput) {
                        currentTextInput.classList.remove("text2");
                        currentTextInput.classList.add("text");
                        currentTextInput.placeholder = "Película";
                    }
                    currentSelect.forEach(select => {
                        select.classList.remove("select2");
                        select.classList.add("select");
                    });
                    timeInputs.forEach(timeInput => {
                        timeInput.classList.remove("time2");
                        timeInput.classList.add("time");
                    });
                }

                if (currentCheckbox) {
                    currentCheckbox.checked = false;
                }
            });

            localStorage.setItem("egreso", JSON.stringify(storedData));
        }

        function ReiniciarTodo() {
            const storedData = egreso();
            const rooms = document.querySelectorAll(".roomanddate2");

            storedData.forEach((data, index) => {
                data.inputnumber = "";
                data.inputtext = "";
                data.inputtime = "";
                data.inputtime2 = "";
                data.classification = "ATP";
                data.format = "2D";
                data.lenguage = "Castellano";
                data.checkbox = false;
                data.posterChanged = false;

                const currentRoom = rooms[index];
                if (!currentRoom) return;
                const currentCheckbox = currentRoom.querySelector("input[type='checkbox']");
                const currentNumberInput = currentRoom.querySelector("input[type='number']");
                const currentTextInput = currentRoom.querySelector("input[type='text']");
                const currentSelect = currentRoom.querySelectorAll("select");
                const timeInputs = currentRoom.querySelectorAll("input[type='time']");
                document.querySelectorAll(".cambiodeposters").forEach(button => {
                    button.disabled = false;
                });
                if (currentNumberInput) {
                    currentNumberInput.className = "number";
                    currentNumberInput.placeholder = "Sala N°";
                    currentNumberInput.value = "";
                }
                if (currentTextInput) {
                    currentTextInput.className = "text";
                    currentTextInput.placeholder = "Película";
                    currentTextInput.value = "";
                }
                currentSelect.forEach(select => {
                    select.className = "select";
                    select.value = select.options[0].value; 
                });
                timeInputs.forEach(timeInput => {
                    timeInput.className = "time";
                    timeInput.value = "";
                });

                if (currentCheckbox) {
                    currentCheckbox.checked = false;
                }
            });
            localStorage.setItem("egreso", JSON.stringify(storedData));
        }

        function crearhorarioE(income,button) {
            const storedData= egreso()
            storedData.push({
                id: Date.now(),
                inputnumber: "",
                inputtime: "",
                inputtime2: "",
                inputtext: "",
                classification: "ATP",
                format: "2D",
                lenguage: "Castellano",
                checkbox: false,
                posterChanged: false
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
                inputnumber.className= "number"
                const inputtext= document.createElement("input")
                inputtext.type= "text"
                inputtext.placeholder= "Película"
                inputtext.className= "text"
                inputtext.value= data.inputtext
                const selectlenguage= document.createElement("select")
                selectlenguage.className= "select"
                const optionsL = ["Castellano","Subtitulada"];
                optionsL.forEach(option => {
                    const selectOption = document.createElement("option");
                    selectOption.value = option;
                    selectOption.textContent = option;
                    if (data.lenguage === option) {
                        selectOption.selected = true;
                    }
                    selectlenguage.appendChild(selectOption);
                });
                const selectFormat= document.createElement("select")
                selectFormat.className= "select"
                const optionsF = ["2D","3D","XD ","4D","D-BOX","Premium Class","3D + XD","2D + XD","4D + XD","4D + 3D","4D + 2D","3D + D-BOX","2D + Premium Class","3D + Premium Class"
                ];
                optionsF.forEach(option => {
                    const selectOption = document.createElement("option");
                    selectOption.value = option;
                    selectOption.textContent = option;
                    if (data.format === option) {
                        selectOption.selected = true;
                    }
                    selectFormat.appendChild(selectOption);
                });
                const selectClassification = document.createElement("select");
                selectClassification.className= "select"
                const options = ["ATP", "+13", "+16", "+18"];
                options.forEach(option => {
                    const selectOption = document.createElement("option");
                    selectOption.value = option;
                    selectOption.textContent = option;
                    if (data.classification === option) {
                        selectOption.selected = true;
                    }
                    selectClassification.appendChild(selectOption);
                });
                const inputtime= document.createElement("input")
                inputtime.type="time"
                inputtime.value= data.inputtime
                inputtime.className= "time"
                const inputtime2= document.createElement("input")
                inputtime2.type="time"
                inputtime2.value= data.inputtime2
                inputtime2.className= "time"
                const checkbox= document.createElement("input")
                checkbox.type= "checkbox"
                checkbox.checked= data.checkbox
                checkbox.className= "checkbox"
                if (data.posterChanged) {
                    inputnumber.classList.remove("number");
                    inputnumber.classList.add("all");
                    inputtext.classList.remove("text");
                    inputtext.classList.add("all");
                    selectlenguage.classList.remove("select");
                    selectlenguage.classList.add("all");
                    selectFormat.classList.remove("select");
                    selectFormat.classList.add("all");
                    selectClassification.classList.remove("select");
                    selectClassification.classList.add("all");
                    inputtime.classList.remove("time");
                    inputtime.classList.add("all");
                    inputtime2.classList.remove("time");
                    inputtime2.classList.add("all");
                }
                if (data.checkbox) {
                    inputnumber.classList.remove("number");
                    inputnumber.classList.add("number2");
                    inputnumber.placeholder=""
                    inputtext.classList.remove("text");
                    inputtext.classList.add("text2");
                    inputtext.placeholder=""
                    selectlenguage.classList.remove("select");
                    selectlenguage.classList.add("select2");
                    selectFormat.classList.remove("select");
                    selectFormat.classList.add("select2");
                    selectClassification.classList.remove("select");
                    selectClassification.classList.add("select2");
                    inputtime.classList.remove("time");
                    inputtime.classList.add("time2");
                    inputtime2.classList.remove("time");
                    inputtime2.classList.add("time2");
                }
                const eliminar= document.createElement("button")
                eliminar.innerText="X"
                eliminar.className= "eliminar"
                eliminar.id= data.id
                const cambiodeposters= document.createElement("button")
                cambiodeposters.innerText="Cambio de Poster"
                cambiodeposters.className= "cambiodeposters"
                cambiodeposters.addEventListener("click", ()=>CambiodePosters(inputnumber, inputtext, selectlenguage, selectFormat, selectClassification, inputtime, inputtime2))
                eliminar.addEventListener("click",(e)=> Eliminar(e,income,button))
                inputnumber.addEventListener("input",()=>{
                    const id= room.getAttribute("data-id")
                    CambiarContenidoN(id,inputnumber)
                })
                inputtext.addEventListener("input",()=>{
                    const id= room.getAttribute("data-id")
                    CambiarContenidoText(id,inputtext)
                })
                selectlenguage.addEventListener("change", () => {
                    const id = room.getAttribute("data-id");
                    CambiarIdioma(id, selectlenguage.value);
                });
                selectFormat.addEventListener("change", () => {
                    const id = room.getAttribute("data-id");
                    CambiarFormato(id, selectFormat.value);
                });
                selectClassification.addEventListener("change", () => {
                    const id = room.getAttribute("data-id");
                    CambiarClasificacion(id, selectClassification.value);
                });
                inputtime.addEventListener("input",()=>{
                    const id= room.getAttribute("data-id")
                    CambiarContenidoT(id,inputtime)
                })
                inputtime2.addEventListener("input",()=>{
                    const id= room.getAttribute("data-id")
                    CambiarContenidoT2(id,inputtime2)
                })
                checkbox.addEventListener("change", () => {
                    const isTachado = checkbox.checked;
                    const id = room.getAttribute("data-id");
                    const storedData = egreso();
                    const dataItem = storedData.find(data => data.id == Number(id));
                    cambiodeposters.disabled = isTachado;
                    
                    if (dataItem) {
                        dataItem.checkbox = isTachado;
                        localStorage.setItem("egreso", JSON.stringify(storedData));

                        const ispostersChanged = dataItem.posterChanged;

                        if (isTachado) {
                            inputnumber.classList.remove("number", "all");
                            inputnumber.classList.add("number2");
                            inputnumber.placeholder = "";
                            inputtext.classList.remove("text", "all");
                            inputtext.classList.add("text2");
                            inputtext.placeholder = "";
                            selectlenguage.classList.remove("select", "all");
                            selectlenguage.classList.add("select2");
                            selectFormat.classList.remove("select", "all");
                            selectFormat.classList.add("select2");
                            selectClassification.classList.remove("select", "all");
                            selectClassification.classList.add("select2");
                            inputtime.classList.remove("time", "all");
                            inputtime.classList.add("time2");
                            inputtime2.classList.remove("time", "all");
                            inputtime2.classList.add("time2");
                        } else if (ispostersChanged) {
                            inputnumber.classList.remove("number2");
                            inputnumber.classList.add("all");
                            inputnumber.placeholder = "Sala N°";
                            inputtext.classList.remove("text2");
                            inputtext.classList.add("all");
                            inputtext.placeholder = "Película";
                            selectlenguage.classList.remove("select2");
                            selectlenguage.classList.add("all");
                            selectFormat.classList.remove("select2");
                            selectFormat.classList.add("all");
                            selectClassification.classList.remove("select2");
                            selectClassification.classList.add("all");
                            inputtime.classList.remove("time2");
                            inputtime.classList.add("all");
                            inputtime2.classList.remove("time2");
                            inputtime2.classList.add("all");
                        } else {
                            inputnumber.classList.remove("number2");
                            inputnumber.classList.add("number");
                            inputnumber.placeholder = "Sala N°";
                            inputtext.classList.remove("text2");
                            inputtext.classList.add("text");
                            inputtext.placeholder = "Película";
                            selectlenguage.classList.remove("select2");
                            selectlenguage.classList.add("select");
                            selectFormat.classList.remove("select2");
                            selectFormat.classList.add("select");
                            selectClassification.classList.remove("select2");
                            selectClassification.classList.add("select");
                            inputtime.classList.remove("time2");
                            inputtime.classList.add("time");
                            inputtime2.classList.remove("time2");
                            inputtime2.classList.add("time");
                        }
                    }
                });

                room.appendChild(cambiodeposters)
                room.appendChild(inputnumber)
                room.appendChild(inputtext)
                room.appendChild(selectlenguage)
                room.appendChild(selectFormat)
                room.appendChild(selectClassification)
                room.appendChild(inputtime)
                room.appendChild(inputtime2)
                room.appendChild(checkbox)
                room.appendChild(eliminar)
                income.insertBefore(room,button)
            })
        }
        function CambiodePosters(inputnumber, inputtext, selectlenguage, selectFormat, selectClassification, inputtime, inputtime2) {
            const id = inputnumber.closest(".roomanddate2").getAttribute("data-id");
            const storedData = egreso();
            const dataIndex = storedData.findIndex(data => data.id == id);

            if (dataIndex !== -1) {
                const isChanged = storedData[dataIndex].posterChanged;
                
                if (isChanged) {
                    storedData[dataIndex].posterChanged = false; 
                    inputnumber.classList.remove("all");
                    inputnumber.classList.add("number");
                    inputtext.classList.remove("all");
                    inputtext.classList.add("text");
                    selectlenguage.classList.remove("all");
                    selectlenguage.classList.add("select");
                    selectFormat.classList.remove("all");
                    selectFormat.classList.add("select");
                    selectClassification.classList.remove("all");
                    selectClassification.classList.add("select");
                    inputtime.classList.remove("all");
                    inputtime.classList.add("time");
                    inputtime2.classList.remove("all");
                    inputtime2.classList.add("time");
                } else {
                    storedData[dataIndex].posterChanged = true;
                    inputnumber.classList.remove("number");
                    inputnumber.classList.add("all");
                    inputtext.classList.remove("text");
                    inputtext.classList.add("all");
                    selectlenguage.classList.remove("select");
                    selectlenguage.classList.add("all");
                    selectFormat.classList.remove("select");
                    selectFormat.classList.add("all");
                    selectClassification.classList.remove("select");
                    selectClassification.classList.add("all");
                    inputtime.classList.remove("time");
                    inputtime.classList.add("all");
                    inputtime2.classList.remove("time");
                    inputtime2.classList.add("all");
                }
                
                localStorage.setItem("egreso", JSON.stringify(storedData));
            }
        }
        
        function Eliminar(e,income,button) {
            const id= Number(e.target.id)
            const storedData = egreso()
            const filtrado= storedData.filter(data =>data.id !== id)
            localStorage.setItem("egreso", JSON.stringify(filtrado))
            listarhorarioE(income,button)
            setTimeout(() => {
            const div2 = document.querySelector(".div2");
                if (document.querySelectorAll(".roomanddate2").length === 0) {
                    div2.className = "oculto";
                }
            }, 5);
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
        function CambiarContenidoText(id,inputtext) {
            const data = egreso();
            const index = data.findIndex((d) => d.id === Number(id));
            if (index !== -1) {
                data[index].inputtext = inputtext.value;
                localStorage.setItem("egreso", JSON.stringify(data));
            }
        }
        function CambiarIdioma(id, newLenguage) {
            const storedData = egreso();
            const dataIndex = storedData.findIndex(data => data.id == id);

            if (dataIndex !== -1) {
                storedData[dataIndex].lenguage = newLenguage;
                localStorage.setItem("egreso", JSON.stringify(storedData));
            }
        }
        function CambiarFormato(id, newFormat) {
            const storedData = egreso();
            const dataIndex = storedData.findIndex(data => data.id == id);

            if (dataIndex !== -1) {
                storedData[dataIndex].format = newFormat;
                localStorage.setItem("egreso", JSON.stringify(storedData));
            }
        }
        function CambiarClasificacion(id, newClassification) {
            const storedData = egreso();
            const dataIndex = storedData.findIndex(data => data.id == id);

            if (dataIndex !== -1) {
                storedData[dataIndex].classification = newClassification;
                localStorage.setItem("egreso", JSON.stringify(storedData));
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
        function CambiarContenidoT2(id,inputtime2) {
            const data = egreso();
            const index = data.findIndex((d) => d.id === Number(id));
            if (index !== -1) {
                data[index].inputtime2 = inputtime2.value;
                localStorage.setItem("egreso", JSON.stringify(data));
            }
        }
        renderizarH()
    }
    Horariosegreso()
    CrearFooter();  
  
}
principal()
