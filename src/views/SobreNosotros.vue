<template>
  <div class="about">
    <h1>Esta es una página sobre nosotros</h1>
    <p>
      Nuestra tienda, ubicada en el corazón del centro de Nueva York, tiene una
      rica historia que se remonta a principios del siglo XX. Fundada en 1925,
      hemos sido testigos y protagonistas del desarrollo comercial de esta
      icónica ciudad. Durante más de un siglo, hemos servido a generaciones de
      clientes con dedicación y excelencia. Nuestro compromiso con la calidad y
      el servicio personalizado nos ha permitido sobrevivir y prosperar a través
      de las eras, desde la época dorada del comercio tradicional hasta la era
      digital. Hoy en día, combinamos la elegancia y autenticidad de nuestras
      raíces clásicas con la innovación moderna, ofreciendo una experiencia de
      compra única que honra nuestro legado mientras abraza el futuro.
    </p>
  </div>
</template>

<script>
export default {
  name: "SobreNosotros",
};
</script>

<style>
.about {
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 30px;
  font-weight: 700;
  text-align: center;
}

p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #404040;
  text-align: justify;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
