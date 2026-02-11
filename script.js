const links = document.querySelectorAll('[data-section]');
const sections = document.querySelectorAll('.section');

function activateSection(id) {
  sections.forEach(section => {
    section.classList.remove('active');
  });

  links.forEach(link => link.classList.remove('active'));

  const target = document.getElementById(id);
  target.classList.add('active');

  document
    .querySelectorAll(`[data-section="${id}"]`)
    .forEach(link => link.classList.add('active'));

  target.scrollIntoView({ behavior: 'smooth' });
}

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    activateSection(link.dataset.section);
  });
});


document.addEventListener("DOMContentLoaded", function () {

  const button = document.getElementById("downloadPdf");
  const cv = document.getElementById("cv");

  if (!button || !cv) {
    console.error("Button or CV section not found.");
    return;
  }

  button.addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const elements = cv.querySelectorAll("h2, h3, p, li");

    const marginLeft = 20;
    const maxWidth = doc.internal.pageSize.getWidth() - 40;
    let y = 20;

    elements.forEach(el => {
      let text = el.innerText.trim();
      if (!text) return;

      if (el.tagName === "H2") {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        y += 10;
      } else if (el.tagName === "H3") {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        y += 6;
      } else {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
      }

      if (el.tagName === "LI") {
        text = "• " + text;
      }

      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, marginLeft, y);

      y += lines.length * 6 + 4;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("NajibNasery-CV.pdf");
  });

});


