// Configuración inicial
let selectedProduct = null;
let selectedPrice = null;
let mercadoPagoLink = null;
let discordServerLink = "https://discord.gg/hDQA99BTpb"; // CAMBIA ESTE LINK POR TU DISCORD

// Configuración de enlaces de Mercado Pago
// REEMPLAZA ESTOS LINKS CON TUS LINKS REALES DE MERCADO PAGO
const mercadoPagoLinks = {
    // Rangos
    "Rango Ares": "https://mpago.la/1iqNCXK",
    "Rango Hades": "https://mpago.la/1iqNCXK",
    "Rango Hermes": "https://mpago.la/17VnNzS",
    "Rango Afrodita": "https://mpago.la/1ZuthBW",
    "Rango Apolo": "https://mpago.la/1ZuthBW",
    "Rango Kraken": "https://mpago.la/1iqNCXK",
    "Rango Zeus": "https://mpago.la/2BYAcNz",
    "Rango Poseidon": "https://mpago.la/1iqNCXK",
    "Rango Nivorxy": "https://mpago.la/16gmAKb",
    "Rango Nivorxy+": "https://mpago.la/2SmK15u",
    
    // Tags
    "Tag Inmortal": "https://mpago.la/25ZPgx7",
    "Tag Op": "https://mpago.la/2TKe8nn",
    "Tag God": "https://mpago.la/1iqNCXK",
    "Tag Chaos": "https://mpago.la/2PHmSBW",
    "Tag Mythic": "https://mpago.la/1nXny5o",
    "Tag Void": "https://mpago.la/2wFgkXY",
    "Tag Omega": "https://mpago.la/2KukbeX",
    "Tag Personalizado": "https://mpago.la/2VJwhf7",
    
    // Unlock/Extras
    "Pack Cosmético Completo": "https://mpago.la/33U8Anh",
    "Unban Modalidad": "https://mpago.la/1ECWGt5",
    "Unban Global": "https://mpago.la/21acsMC",
    "Unban Discord": "https://mpago.la/2wcQGkS",
    "UnBlacklist": "https://mpago.la/2sCtGcj",
    
    // Coins
    "10,000 Coins": "https://mpago.la/2gDCzBc",
    "50,000 Coins": "https://mpago.la/1Eav5ku"
};

// Crear partículas animadas en el fondo
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        const greenValue = Math.floor(Math.random() * 100 + 100);
        const colorType = Math.random();
        
        if (colorType < 0.33) {
            particle.style.backgroundColor = `rgba(0, ${greenValue}, 80, ${Math.random() * 0.4 + 0.1})`;
        } else if (colorType < 0.66) {
            particle.style.backgroundColor = `rgba(255, ${Math.floor(greenValue * 0.8)}, 0, ${Math.random() * 0.3 + 0.1})`;
        } else {
            particle.style.backgroundColor = `rgba(0, ${Math.floor(greenValue * 1.2)}, 255, ${Math.random() * 0.3 + 0.1})`;
        }
        
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        container.appendChild(particle);
    }
}

// Filtrar productos por categoría
function filterProducts() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const products = document.querySelectorAll('.product-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            products.forEach(product => {
                if (category === 'all' || product.dataset.category === category) {
                    product.style.display = 'block';
                    setTimeout(() => {
                        product.style.opacity = '1';
                        product.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    product.style.opacity = '0';
                    product.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        product.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Manejar compra de productos
function setupPurchaseButtons() {
    const buyButtons = document.querySelectorAll('.btn-buy');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectedProduct = this.dataset.product;
            selectedPrice = this.dataset.price;
            
            // Obtener el enlace del objeto mercadoPagoLinks
            mercadoPagoLink = mercadoPagoLinks[selectedProduct];
            
            if (!mercadoPagoLink) {
                alert('Error: No se encontró el enlace de pago para este producto. Contacta al administrador.');
                console.error('No hay enlace de Mercado Pago para:', selectedProduct);
                return;
            }
            
            // Actualizar modal con información del producto
            document.getElementById('modalProductName').textContent = selectedProduct;
            document.getElementById('modalProductPrice').textContent = `$${selectedPrice}`;
            
            // Actualizar link de Discord
            document.getElementById('discordLink').textContent = discordServerLink;
            document.getElementById('successDiscordLink').textContent = discordServerLink;
            
            // Mostrar modal de compra
            document.getElementById('purchaseModal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Mostrar instrucciones
            document.getElementById('mercadoPagoInstructions').style.display = 'block';
        });
    });
}

// Enviar pedido al sistema (simulación)
function sendOrderToStaff(orderDetails) {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const discordUser = document.getElementById('discordUser').value;
    const transactionId = orderDetails.id;
    
    const orderData = {
        product: selectedProduct,
        price: selectedPrice,
        username: username,
        email: email,
        discordUser: discordUser,
        transactionId: transactionId,
        date: new Date().toISOString(),
        status: 'pending',
        mercadoPagoLink: mercadoPagoLink
    };
    
    // Guardar en localStorage para simulación
    const orders = JSON.parse(localStorage.getItem('nivorxy_orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('nivorxy_orders', JSON.stringify(orders));
    
    console.log('Pedido registrado:', orderData);
    
    return orderData;
}

// Mostrar modal de éxito
function showSuccessModal(orderDetails) {
    const username = document.getElementById('username').value;
    const discordUser = document.getElementById('discordUser').value;
    const transactionId = 'NIV-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const now = new Date();
    
    // Actualizar información en el modal
    document.getElementById('transactionId').textContent = transactionId;
    document.getElementById('transactionDate').textContent = 
        `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    document.getElementById('successProduct').textContent = selectedProduct;
    document.getElementById('successPrice').textContent = `$${selectedPrice}`;
    document.getElementById('successUsername').textContent = username;
    
    document.getElementById('successMessage').innerHTML = 
        `¡Gracias por tu compra, <strong>${username}</strong>!<br>Ahora sigue estos pasos para recibir tu producto.`;
    
    // Ocultar modal de compra
    document.getElementById('purchaseModal').style.display = 'none';
    
    // Mostrar modal de éxito
    document.getElementById('successModal').style.display = 'flex';
    
    // Registrar el pedido
    const orderData = {
        id: transactionId,
        username: username,
        discordUser: discordUser,
        product: selectedProduct,
        price: selectedPrice,
        date: now.toISOString()
    };
    
    sendOrderToStaff(orderData);
    
    // Limpiar formulario
    document.getElementById('purchaseForm').reset();
}

// Configurar modales
function setupModals() {
    // Modal de compra
    const purchaseModal = document.getElementById('purchaseModal');
    const closeModalBtn = purchaseModal.querySelector('.modal-close');
    const cancelBtn = purchaseModal.querySelector('.btn-cancel');
    const mercadoPagoBtn = document.getElementById('btnMercadoPago');
    
    // Cerrar modal con botón X
    closeModalBtn.addEventListener('click', () => {
        purchaseModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Cerrar modal con botón Cancelar
    cancelBtn.addEventListener('click', () => {
        purchaseModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Cerrar modal haciendo click fuera
    purchaseModal.addEventListener('click', (e) => {
        if (e.target === purchaseModal) {
            purchaseModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Botón de Mercado Pago
    mercadoPagoBtn.addEventListener('click', () => {
        // Validar formulario
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const discordUser = document.getElementById('discordUser').value;
        const terms = document.getElementById('terms').checked;
        
        if (!username || !email || !discordUser || !terms) {
            alert('Por favor, completa todos los campos y acepta los términos.');
            return;
        }
        
        // Validar que tengamos un link de Mercado Pago
        if (!mercadoPagoLink || mercadoPagoLink.includes("mpago.li") || mercadoPagoLink.includes("mp-link")) {
            alert('Error: El producto no tiene un link de Mercado Pago configurado correctamente. Contacta al administrador.');
            console.error('Link incorrecto de Mercado Pago para:', selectedProduct, 'Link:', mercadoPagoLink);
            return;
        }
        
        // Verificar que el link comience con https://mpago.la/
        if (!mercadoPagoLink.startsWith('https://mpago.la/')) {
            console.warn('El link de Mercado Pago no tiene el formato esperado:', mercadoPagoLink);
        }
        
        // Abrir Mercado Pago en nueva pestaña
        window.open(mercadoPagoLink, '_blank');
        
        // Mostrar modal de éxito con instrucciones
        showSuccessModal();
    });
    
    // Modal de éxito
    const successModal = document.getElementById('successModal');
    const closeSuccessBtn = successModal.querySelector('.btn-close-success');
    
    closeSuccessBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    filterProducts();
    setupPurchaseButtons();
    setupModals();
    
    // Efecto de escritura en títulos
    const title = document.querySelector('.section-title');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 300);
    }
    
    // Agregar efecto 3D a las tarjetas
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((centerY - y) / centerY) * 5;
            
            card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-10px) rotateX(0) rotateY(0)';
        });
    });
    
    // Panel de administración para el staff
    window.showStaffPanel = function() {
        const password = prompt('Ingresa la contraseña del staff:');
        if (password === 'nivorxy2025') {
            const orders = JSON.parse(localStorage.getItem('nivorxy_orders') || '[]');
            
            let message = `Pedidos pendientes: ${orders.length}\n\n`;
            orders.forEach((order, index) => {
                message += `Pedido #${index + 1}:\n`;
                message += `Producto: ${order.product}\n`;
                message += `Usuario: ${order.username}\n`;
                message += `Discord: ${order.discordUser}\n`;
                message += `Precio: $${order.price}\n`;
                message += `Fecha: ${order.date}\n`;
                message += `ID: ${order.transactionId}\n`;
                message += `Status: ${order.status}\n`;
                message += `Mercado Pago: ${order.mercadoPagoLink}\n`;
                message += '─'.repeat(30) + '\n';
            });
            
            alert(message);
        } else {
            alert('Contraseña incorrecta');
        }
    };
});

// Función para exportar pedidos (para el staff)
function exportOrders() {
    const orders = JSON.parse(localStorage.getItem('nivorxy_orders') || '[]');
    const dataStr = JSON.stringify(orders, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `nivorxy_orders_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Configurar Discord link (llamable desde consola)
function setDiscordLink(link) {
    discordServerLink = link;
    localStorage.setItem('nivorxy_discord_link', link);
    alert(`Link de Discord actualizado a: ${link}`);
}

// Cargar Discord link guardado
document.addEventListener('DOMContentLoaded', function() {
    const savedLink = localStorage.getItem('nivorxy_discord_link');
    if (savedLink) {
        discordServerLink = savedLink;
    }
});

// Función para actualizar links de Mercado Pago
function updateMercadoPagoLinks(newLinks) {
    Object.keys(newLinks).forEach(key => {
        mercadoPagoLinks[key] = newLinks[key];
    });
    alert('Links de Mercado Pago actualizados');
}

// Instrucciones para el administrador
console.log(`
=== INSTRUCCIONES PARA CONFIGURAR LA TIENDA ===

1. CONFIGURA TU DISCORD:
   - Ve al archivo enproceso.js
   - Busca la variable 'discordServerLink'
   - Reemplaza "https://discord.gg/tu-link-aqui" con tu link de Discord
   O usa en consola: setDiscordLink("tu-link-de-discord")

2. VERIFICA LOS LINKS DE MERCADO PAGO:
   - Los links deben comenzar con: https://mpago.la/
   - Ejemplo correcto: https://mpago.la/1iqNCXK
   - Ejemplo incorrecto: https://mpago.li/1iqNCXK (nota la "i" en .li)
   
3. ACTUALIZA LOS LINKS DE MERCADO PAGO:
   - En consola puedes usar: updateMercadoPagoLinks({ "Producto": "https://mpago.la/tu-link" })
   - O modifica directamente el objeto 'mercadoPagoLinks' en el código

4. LINKS QUE NECESITAN CORRECCIÓN (tienen mpago.li):
   - "Rango Ares": Cambiar a mpago.la
   - "Tag God": Agregar link real
   - "Rango Kraken": Agregar link real  
   - "Rango Poseidon": Agregar link real

5. PANEL DE ADMINISTRACIÓN:
   - En consola: showStaffPanel()
   - Contraseña: nivorxy2025
   - Para exportar: exportOrders()

6. SISTEMA DE ENTREGA:
   - Los usuarios pagan en Mercado Pago
   - Luego abren ticket en Discord con comprobante
   - Tú verificas y entregas el producto manualmente
`);
