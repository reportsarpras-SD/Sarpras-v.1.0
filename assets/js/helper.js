// GANTI URL INI DENGAN URL WEB APP ANDA
const API_URL = 'https://script.google.com/macros/s/AKfycbzJOWkV1ASZSGVQBzLzTn18WCHTrq_JHxx-uvwCVTvoWiTSloAA3wB4uW2eSJdGomL4gA/exec';

async function apiGet(action, params = {}) {
    try {
        console.log('📡 API GET:', action, params);
        
        let url = API_URL + '?action=' + encodeURIComponent(action);
        
        // HANYA tambahkan parameter yang tidak kosong
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
                url += '&' + key + '=' + encodeURIComponent(params[key]);
            }
        });
        
        console.log('🔗 URL:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow'
        });
        
        const data = await response.json();
        console.log('✅ Response:', data);
        
        return data;
    } catch (error) {
        console.error('❌ Error:', error);
        return { success: false, message: 'Koneksi gagal: ' + error.message };
    }
}

async function apiPost(action, data = {}) {
    try {
        console.log('📡 API POST:', action, data);
        
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ action: action, ...data }),
            redirect: 'follow'
        });
        
        const result = await response.json();
        console.log('✅ Response:', result);
        
        return result;
    } catch (error) {
        console.error('❌ Error:', error);
        return { success: false, message: 'Koneksi gagal: ' + error.message };
    }
}

// Fungsi-fungsi API
async function login(username, password, role) { 
    return await apiGet('login', { username, password, role }); 
}

async function getSekolah(filters = {}) { 
    return await apiGet('getSekolah', filters); 
}

async function saveSekolah(data) { 
    return await apiPost('saveSekolah', data); 
}

async function deleteSekolah(id) { 
    return await apiPost('deleteSekolah', { id }); 
}

async function getSarpras(filters = {}) { 
    return await apiGet('getSarpras', filters); 
}

async function saveSarpras(data) { 
    return await apiPost('saveSarpras', data); 
}

async function getLaporanKerusakan() { 
    return await apiGet('getLaporanKerusakan'); 
}

async function saveLaporanKerusakan(data) { 
    return await apiPost('saveLaporanKerusakan', data); 
}

async function getMonitoring() { 
    return await apiGet('getMonitoring'); 
}

async function updateStatusLaporan(data) { 
    return await apiPost('updateStatusLaporan', data); 
}

async function getStats() { 
    return await apiGet('getStats'); 
}

// UI Functions
function showNotif(pesan, tipe = 'success') {
    const notif = document.createElement('div');
    notif.className = `alert alert-${tipe} alert-dismissible fade show position-fixed`;
    notif.style.cssText = 'top: 80px; right: 20px; z-index: 9999; min-width: 300px;';
    notif.innerHTML = `${pesan}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

function showLoading(pesan = 'Memproses...') {
    let loader = document.getElementById('globalLoader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'globalLoader';
        loader.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:99999;display:flex;align-items:center;justify-content:center;';
        loader.innerHTML = `<div class="bg-white rounded-3 p-4 text-center"><div class="spinner-border text-navy mb-2"></div><p class="mb-0">${pesan}</p></div>`;
        document.body.appendChild(loader);
    }
}

function hideLoading() {
    const loader = document.getElementById('globalLoader');
    if (loader) loader.style.display = 'none';
}
