// Datos de ejemplo (puedes reemplazarlos con tus propias imágenes y textos)
const cardsData = [
  { image: "./IMG/Monroy.jpg", text: "Monroy" , count: 0 },
  { image: "./IMG/Willy.jpg", text: "Willy" , count: 0 },
  { image: "./IMG/Barreto.jpg", text: "Barreto" , count: 0 },
  { image: "./IMG/Pipe Plazas.jpg", text: "Pipe Plazas" , count: 0 },
  { image: "./IMG/Jujui.jpg", text: "Jujui" , count: 0 },
  { image: "./IMG/Gonza.jpg", text: "Gonza" , count: 0 },
  { image: "./IMG/Camilo.jpg", text: "Camilo" , count: 0 },
  { image: "./IMG/Gordo.jpg", text: "Sebitas5000" , count: 0 },
  { image: "./IMG/Juansho.jpg", text: "Juansho" , count: 0 },
  { image: "./IMG/Killa.jpg", text: "Killa" , count: 0 },
  { image: "./IMG/German.jpeg", text: "German" , count: 0 },
  { image: "./IMG/Cascara.jpg", text: "Cascara", count: 0  },
];

const cardContainer = document.getElementById('cardContainer');
const thankYouMessage = document.getElementById('thankYouMessage');
const barChartCanvas = document.getElementById('barChart');
const barChartContext = barChartCanvas.getContext('2d');
let barChart;

// Cargar la información de votación desde localStorage
let votesData = JSON.parse(localStorage.getItem('votesData')) || {};

// Verificar si el usuario ya ha votado
let hasVoted = votesData.hasVoted || false;

// Verificar si se permite votar
let votingEnabled = !hasVoted;

function renderCards(cards) {
  cardContainer.innerHTML = '';
  cards.forEach((cardData, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${cardData.image}" alt="Card Image">
      <div class="card-text">${cardData.text}</div>
    `;
    if (votingEnabled) {
      card.addEventListener('click', () => handleCardClick(index));
    } else {
      card.style.cursor = 'not-allowed';
    }
    cardContainer.appendChild(card);
  });
}

function handleCardClick(index) {
  // Verificar si el usuario puede votar
  if (votingEnabled) {
    cardsData[index].count++;
    updateBarChart();
    // Marcar que el usuario ha votado
    votesData.hasVoted = true;
    // Guardar la información de votación en localStorage
    localStorage.setItem('votesData', JSON.stringify(votesData));
    // Deshabilitar el clic en todas las cards después de votar
    disableCardClick();
    // Mostrar el mensaje de agradecimiento y la gráfica
    showThankYouMessage();
    showBarChart();
    // Actualizar el estado de votación
    hasVoted = true;
    votingEnabled = false;
  }
}

function updateBarChart() {
  if (barChart) {
    barChart.destroy();
  }

  const labels = cardsData.map((card, index) => `Card ${index + 1}`);
  const data = cardsData.map(card => card.count);

  barChart = new Chart(barChartContext, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Número de veces seleccionado',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function disableCardClick() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.removeEventListener('click', handleCardClick);
    card.style.cursor = 'not-allowed';
  });
}

function showThankYouMessage() {
  thankYouMessage.style.display = 'block';
}

function showBarChart() {
  barChartCanvas.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  renderCards(cardsData);
  if (hasVoted) {
    disableCardClick();
    showThankYouMessage();
    showBarChart();
    updateBarChart();
  }
});