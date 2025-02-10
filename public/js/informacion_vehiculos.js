const vehicles = [
  {
    id: 0,
    title: "Ford F-150",
    year: 2015,
    km: "70,500 km",
    siniestroDescription: "En este apartado se muestran los detalles del sinistero del vehículo",
    progress: 65,
    images: [
      { src: "public/images/Ford-0.png", alt: "Vehículo en subasta", active: true },
      { src: "public/images/Ford-1.jpeg", alt: "Vehículo en subasta" },
      { src: "public/images/Ford-2.jpeg", alt: "Vehículo en subasta" },
      { src: "public/images/Ford-3.webp", alt: "Vehículo en subasta" }
    ],
    repairBag: "$35,600 MXN",
    location: "Monterrey, NL",
    seller: "Raul Hernandez"
  },
  {
    id: 1,
    title: "Mercedes-Benz Clase G",
    year: 2023,
    km: "8,500 km",
    siniestroDescription: "En este apartado se muestran los detalles del sinistero del vehículo",
    progress: 65,
    images: [
      { src: "public/images/Mercedes-0.jpg", alt: "Vehículo en subasta", active: true },
      { src: "public/images/Mercedes-1.png", alt: "Vehículo en subasta" },
      { src: "public/images/Mercedes-2.jpeg", alt: "Vehículo en subasta" },
      { src: "public/images/Mercedes-3.jpeg", alt: "Vehículo en subasta" }
    ],
    repairBag: "$78,400 MXN",
    location: "Ciudad de México, CDM",
    seller: "Ángel Cano"
  }
];

function renderVehicles() {
  const template = document.getElementById('vehicle-template').innerHTML;
  const container = document.querySelector('.page-container');

  vehicles.forEach((vehicle, index) => {
    const html = Mustache.render(template, {
      ...vehicle,
      id: index, // Usamos el índice para IDs únicos
      active: index === 0 // Marcar primer item como activo
    });

    container.insertAdjacentHTML('beforeend', html);
  });
}

function createPagination() {
  const pagination = document.querySelector('.pagination');

  vehicles.forEach((_, index) => {
    const li = document.createElement('li');
    li.className = `page-item ${index === 0 ? 'active' : ''}`;
    li.innerHTML = `<a class="page-link" href="#" data-page="${index + 1}">${index + 1}</a>`;
    pagination.appendChild(li);
  });
}

function initializeBidHandlers() {
  document.querySelectorAll('.btn-bid').forEach(button => {
      button.addEventListener('click', function() {
          const vehicleId = this.closest('.page').querySelector('.bid-input').dataset.vehicleId;
          const bidInput = document.querySelector(`.bid-input[data-vehicle-id="${vehicleId}"]`);
          
          const bidDisplay = document.querySelector(`.bid-display[data-vehicle-id="${vehicleId}"]`);
          
          if (bidInput.value) {
              bidDisplay.classList.remove('d-none');
              bidDisplay.querySelector('h4').textContent = `$${bidInput.value} MXN`;
              bidInput.value = ''; // Limpiar el input
          }
      });
  });
}

function initializeCarousels() {
  vehicles.forEach((_, index) => {
      const carouselElement = document.getElementById(`carousel-${index}`);
      new bootstrap.Carousel(carouselElement, {
          interval: 5000,
          wrap: true
      });
  });
}



function initializeTimers() {
  document.querySelectorAll('.time-display').forEach((timeDisplay) => {
      const countdownEnd = Date.now() + 12 * 60 * 60 * 1000; // 12 horas desde ahora

      function updateTimer() {
          const now = Date.now();
          const remaining = countdownEnd - now;

          if (remaining <= 0) {
              timeDisplay.querySelector('.hours').textContent = '00';
              timeDisplay.querySelector('.minutes').textContent = '00';
              timeDisplay.querySelector('.seconds').textContent = '00';
              clearInterval(interval);
              return;
          }

          const hours = Math.floor(remaining / (1000 * 60 * 60));
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

          timeDisplay.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
          timeDisplay.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
          timeDisplay.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
      }

      const interval = setInterval(updateTimer, 1000);
      updateTimer(); // Llamada inicial
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderVehicles();       // Crea las tarjetas
  createPagination();     // Genera los botones de paginación
  initializeCarousels();  // Activa los carruseles
  initializeTimers();     // Activa los temporizadores
  initializeBidHandlers() // Activa los manejadores de subastas
  
  // Event listener para la paginación
  document.querySelectorAll('.page-link').forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const pageIndex = parseInt(this.dataset.page) - 1;
          
          document.querySelectorAll('.page, .page-item').forEach(el => {
              el.classList.remove('active');
          });
          
          document.querySelectorAll('.page')[pageIndex].classList.add('active');
          this.parentElement.classList.add('active');
      });
  });
});