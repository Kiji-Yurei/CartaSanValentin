// Abrir tarjeta
const cardClosed = document.getElementById('cardClosed');
const cardOpen = document.getElementById('cardOpen');
const closeBtn = document.getElementById('closeBtn');
const editableText = document.getElementById('editableText');
const editableText2 = document.getElementById('editableText2');
const editableText3 = document.getElementById('editableText3');
const editablePoem = document.getElementById('editablePoem');

const cardOverlay = document.getElementById('cardOverlay');

// Abrir la tarjeta al hacer clic
cardClosed.addEventListener('click', () => {
    cardClosed.style.display = 'none';
    cardOverlay.style.display = 'block';
    cardOpen.style.display = 'block';
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        editableText.focus();
    }, 500);
});

// Cerrar la tarjeta
function closeCard() {
    cardOpen.style.display = 'none';
    cardOverlay.style.display = 'none';
    cardClosed.style.display = 'block';
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeCard();
});

// Cerrar al hacer clic en el overlay
cardOverlay.addEventListener('click', () => {
    closeCard();
});

// Prevenir que se cierre al hacer clic dentro del papel
const letterPaper = document.querySelector('.letter-paper');
if (letterPaper) {
    letterPaper.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Función para manejar carga de imágenes
function setupImageUpload(inputId, previewId) {
    const imageInput = document.getElementById(inputId);
    const imagePreview = document.getElementById(previewId);
    const uploadLabel = imageInput.closest('.image-upload-area').querySelector('.upload-label');
    
    imageInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length > 0) {
            // Ocultar el label de upload
            uploadLabel.style.display = 'none';
        }
        
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = (event) => {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.alt = 'Imagen cargada';
                    img.style.width = '100%';
                    img.style.maxHeight = '200px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '8px';
                    img.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                    img.style.border = '2px solid #ffd6e8';
                    
                    // Botón para eliminar imagen
                    const container = document.createElement('div');
                    container.style.position = 'relative';
                    container.style.display = 'block';
                    container.style.marginBottom = '10px';
                    
                    const removeBtn = document.createElement('button');
                    removeBtn.innerHTML = '✕';
                    removeBtn.style.position = 'absolute';
                    removeBtn.style.top = '10px';
                    removeBtn.style.right = '10px';
                    removeBtn.style.background = '#ff6b9d';
                    removeBtn.style.border = 'none';
                    removeBtn.style.borderRadius = '50%';
                    removeBtn.style.width = '30px';
                    removeBtn.style.height = '30px';
                    removeBtn.style.color = 'white';
                    removeBtn.style.cursor = 'pointer';
                    removeBtn.style.fontSize = '1rem';
                    removeBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
                    removeBtn.style.zIndex = '10';
                    removeBtn.style.transition = 'all 0.3s';
                    
                    removeBtn.addEventListener('mouseenter', () => {
                        removeBtn.style.background = '#c44569';
                        removeBtn.style.transform = 'scale(1.1)';
                    });
                    
                    removeBtn.addEventListener('mouseleave', () => {
                        removeBtn.style.background = '#ff6b9d';
                        removeBtn.style.transform = 'scale(1)';
                    });
                    
                    removeBtn.addEventListener('click', () => {
                        container.remove();
                        // Mostrar el label de upload si no hay más imágenes
                        if (imagePreview.children.length === 0) {
                            uploadLabel.style.display = 'flex';
                        }
                    });
                    
                    container.appendChild(img);
                    container.appendChild(removeBtn);
                    imagePreview.appendChild(container);
                };
                
                reader.readAsDataURL(file);
            }
        });
        
        // Limpiar el input para permitir cargar la misma imagen de nuevo
        e.target.value = '';
    });
}

// Configurar los inputs de imágenes
setupImageUpload('imageInput1', 'imagePreview1');
setupImageUpload('imageInput2', 'imagePreview2');
setupImageUpload('imageInput3', 'imagePreview3');

// Placeholder para el texto editable principal
editableText.addEventListener('focus', function() {
    if (this.textContent === 'Tu mensaje lindo podría ir aquí 💕') {
        this.textContent = '';
    }
});

editableText.addEventListener('blur', function() {
    if (this.textContent.trim() === '') {
        this.textContent = 'Tu mensaje lindo podría ir aquí 💕';
    }
});

// Placeholder para el poema
editablePoem.addEventListener('focus', function() {
    if (this.textContent === 'Tu poema podría ir aquí ✍️') {
        this.textContent = '';
    }
});

editablePoem.addEventListener('blur', function() {
    if (this.textContent.trim() === '') {
        this.textContent = 'Tu poema podría ir aquí ✍️';
    }
});

// Placeholder para el texto editable 3
if (editableText3) {
    editableText3.addEventListener('focus', function() {
        if (this.textContent === 'Escribe tu mensaje aquí...' || this.textContent === 'Tu mensaje especial podría ir aquí 💖') {
            this.textContent = '';
        }
    });

    editableText3.addEventListener('blur', function() {
        if (this.textContent.trim() === '') {
            this.textContent = this.hasAttribute('contenteditable') ? 'Escribe tu mensaje aquí...' : 'Tu mensaje especial podría ir aquí 💖';
        }
    });
}

// Placeholder para el texto editable secundario (dedicatoria)
editableText2.addEventListener('focus', function() {
    if (this.textContent === 'Tu dedicatoria especial podría ir aquí 💖' || this.textContent === 'Escribe tu dedicatoria especial aquí...') {
        this.textContent = '';
    }
});

editableText2.addEventListener('blur', function() {
    if (this.textContent.trim() === '') {
        this.textContent = this.hasAttribute('contenteditable') ? 'Escribe tu dedicatoria especial aquí...' : 'Tu dedicatoria especial podría ir aquí 💖';
    }
});
