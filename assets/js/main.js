document.addEventListener('DOMContentLoaded', function() {
    const mainNav = document.getElementById('mainNav');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebar = document.getElementById('closeSidebar');
    
    // Verificar que todos los elementos existan para evitar errores
    if (!sidebarToggle || !sidebar || !sidebarOverlay || !closeSidebar) {
        console.error('Error: Uno o más elementos del sidebar no se encontraron');
        return; // Detener la ejecución si faltan elementos
    }
    
    // Función para manejar el cambio de estilo al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });
    
    // Si al cargar ya hay scroll
    if (window.scrollY > 50) {
        mainNav.classList.add('scrolled');
    }
    
    // Asegurarse de que el sidebar está cerrado al cargar la página
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    
    // Funciones para el menú lateral
    function openSidebar() {
        console.log('Abriendo sidebar'); // Para depuración
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
    
    function closeSidebarMenu() {
        console.log('Cerrando sidebar'); // Para depuración
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll
    }
    
    // Event listeners para abrir/cerrar el sidebar
    sidebarToggle.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarMenu);
    sidebarOverlay.addEventListener('click', closeSidebarMenu);
    
    // Cerrar sidebar con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebarMenu();
        }
    });
    
    // Cerrar sidebar al hacer clic en un enlace del sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Agregamos un pequeño retraso para que se vea la selección antes de cerrar
            setTimeout(closeSidebarMenu, 150);
        });
    });
});


/**
 * Script para manejar la navegación activa
 * Detecta la URL actual y agrega la clase 'active' al enlace correspondiente
 */
document.addEventListener('DOMContentLoaded', function() {
    // Función para marcar el enlace activo según la URL actual
    function setActiveNavLink() {
      // Obtener la ruta actual
      const currentPath = window.location.pathname;
      
      // Normalizar la ruta (eliminar trailing slash si existe)
      const normalizedPath = currentPath.endsWith('/') && currentPath !== '/' 
        ? currentPath.slice(0, -1) 
        : currentPath;
      
      // Seleccionar todos los enlaces de navegación (tanto en navbar como en sidebar)
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .sidebar-menu a');
      
      // Determinar página actual
      const isHome = normalizedPath === '/' || normalizedPath === '/index.html';
      const isMenu = normalizedPath.includes('/menu');
      const isContacto = normalizedPath.includes('/contacto');
      const isReservas = normalizedPath.includes('/reservas');
      
      // Eliminar la clase 'active' de todos los enlaces
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // Aplicar la clase 'active' al enlace correspondiente a la página actual
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        if (isHome && (href === '/' || href === '/index.html' || href === 'index.html')) {
          link.classList.add('active');
        } else if (isMenu && href.includes('/menu')) {
          link.classList.add('active');
        } else if (isContacto && href.includes('/contacto')) {
          link.classList.add('active');
        } else if (isReservas && href.includes('/reservas')) {
          link.classList.add('active');
        }
      });
    }
    
    // Ejecutar función al cargar la página
    setActiveNavLink();
    
    // Opcional: actualizar al cambiar la ruta (útil para aplicaciones SPA)
    window.addEventListener('popstate', setActiveNavLink);
  });