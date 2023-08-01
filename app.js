// Carlos Salazar | 2021-1932

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Ruta para obtener y mostrar los contactos almacenados en la URL
app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://www.raydelto.org/agenda.php', {});
    const contacts = response.data.sort((a, b) => a.nombre.localeCompare(b.nombre));

    res.render('index', { contacts });
  } catch (error) {
    console.error('Error al obtener los contactos', error);
    res.status(500).send('Error al obtener los contactos');
  }
});

// Ruta para mostrar el formulario para agregar nuevos contactos
app.get('/add', (req, res) => {
  res.render('add');
});

// Ruta para procesar el formulario y agregar nuevos contactos
app.post('/add', async (req, res) => {
  try {
    const { nombre, apellido, telefono } = req.body;

    // Envio de los datos a la URL externa para almacenar el nuevo contacto
    await axios.post('http://www.raydelto.org/agenda.php', {
      nombre,
      apellido,
      telefono,
    });

    // Redirigir a la página principal después de agregar el contacto
    res.redirect('/');
  } catch (error) {
    console.error('Error al agregar el contacto', error);
    res.status(500).send('Error al agregar el contacto');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en http://localhost:${PORT}`);
});
