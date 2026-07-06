function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('show');
}

document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth < 992) {
        if (!sidebar.contains(e.target) && !e.target.closest('[onclick*="toggleSidebar"]')) {
            sidebar.classList.remove('show');
        }
    }
});