/* ═══════════════════════════════════════════════════════════
   CIRCLO — App Logic (HTML + CSS + Vanilla JS)
   State persisted in localStorage under "circlo_state".
   ═══════════════════════════════════════════════════════════ */
'use strict';

/* ───────── Data ───────── */
const PRODUCTS = [
  { id: 'p1', name: 'Vintage Denim Jacket', price: 495000, category: 'Fashion', condition: 'Excellent', seller: 'Laras', rating: 4.8, sales: 214, swap: true, featured: true,
    img: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=640&q=80',
    desc: 'Classic vintage-wash denim jacket, gently worn with no rips or stains. Boxy fit, true to size — a timeless layer for everyday wear.', wants: 'Books or analog cameras' },
  { id: 'p2', name: 'Retro Canvas Sneakers 42', price: 150000, category: 'Fashion', condition: 'Good', seller: 'Bimo', rating: 4.6, sales: 168, swap: true, featured: false,
    img: 'https://images.unsplash.com/photo-1549298916-b41d501d486d?auto=format&fit=crop&w=640&q=80',
    desc: 'Clean retro low-tops, size 42 EU. Sole still grippy with light creasing on the toe box. Freshly cleaned and deodorized.', wants: 'Fashion items up to Rp200.000' },
  { id: 'p3', name: 'Classic Leather Watch', price: 250000, category: 'Fashion', condition: 'Like New', seller: 'Sinta', rating: 4.9, sales: 96, swap: false, featured: true,
    img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a6b?auto=format&fit=crop&w=640&q=80',
    desc: 'Minimalist analog watch with genuine leather strap. Keeps perfect time, battery replaced last month. Comes with original box.', wants: '' },
  { id: 'p4', name: 'Vinyl — Abbey Road (1st Press)', price: 85000, category: 'Tech', condition: 'Good', seller: 'Laras', rating: 4.8, sales: 87, swap: true, featured: true,
    img: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?auto=format&fit=crop&w=640&q=80',
    desc: 'Original pressing of The Beatles’ Abbey Road. Plays with light surface noise, sleeve has honest ring wear. A must for vinyl collectors.', wants: 'Jazz or classic rock vinyl' },
  { id: 'p5', name: 'The Great Gatsby — 1925 Edition', price: 75000, category: 'Books', condition: 'Fair', seller: 'Ayu', rating: 4.5, sales: 64, swap: true, featured: false,
    img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=640&q=80',
    desc: 'A beloved hardcover classic. Yellowed pages, name inscribed on the first page, spine intact. Full of one owner’s love and margin notes.', wants: 'Any Hemingway or Orwell' },
  { id: 'p6', name: 'The Design of Everyday Things', price: 120000, category: 'Books', condition: 'Excellent', seller: 'Rafi', rating: 4.7, sales: 132, swap: false, featured: false,
    img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=640&q=80',
    desc: 'Don Norman’s design bible. Near-mint paperback, no highlighting, spine crack-free. Essential for designers and curious minds.', wants: '' },
  { id: 'p7', name: 'Analog Film Camera — 35mm', price: 850000, category: 'Tech', condition: 'Excellent', seller: 'Bimo', rating: 5.0, sales: 41, swap: true, featured: false,
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=640&q=80',
    desc: 'Fully serviced 35mm rangefinder. Light meter accurate, shutter curtains perfect, new strap included. Shoots like a dream.', wants: 'Vintage lenses or film stock' },
  { id: 'p8', name: 'Vintage Round Sunglasses', price: 95000, category: 'Fashion', condition: 'Like New', seller: 'Sinta', rating: 4.4, sales: 150, swap: false, featured: false,
    img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=640&q=80',
    desc: 'Timeless round acetate frames, UV400 lenses, zero scratches. Includes hard case and microfiber cloth.', wants: '' },
  { id: 'p9', name: 'Mid-Century Desk Lamp', price: 135000, category: 'Tech', condition: 'Good', seller: 'Ayu', rating: 4.6, sales: 73, swap: true, featured: false,
    img: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab782?auto=format&fit=crop&w=640&q=80',
    desc: 'Solid brass adjustable desk lamp with warm glow. Minor patina adds character. Rewired with modern cable and E27 fitting.', wants: 'Books on design or architecture' },
];

const SCREENS = [
  ['onboarding', '01', 'Onboarding'], ['register', '02', 'Register'], ['home', '03', 'Home'],
  ['marketplace', '04', 'Marketplace'], ['detail', '05', 'Product Detail'], ['swap', '06', 'Circlo Swap'],
  ['swaprequest', '07', 'Swap Request'], ['sell', '08', 'Sell Item'], ['checkout', '09', 'Checkout'],
  ['impact', '10', 'Impact'], ['chat', '11', 'Chat'], ['profile', '12', 'Profile'],
];

const STORAGE_KEY = 'circlo_state_v1';

function defaultState() {
  return {
    user: null,
    cart: [],
    favorites: [],
    myListings: [],
    purchases: [],
    swaps: [],
    activities: [
      { text: 'Sold 2 items — Vintage Tote & Film Camera', time: '2d ago' },
      { text: 'Completed 1 swap with Rafi', time: '5d ago' },
      { text: 'Earned Eco Starter badge', time: '1w ago' },
    ],
    itemsRescued: 12,
    points: 380,
    address: 'Jl. Sudirman No. 45, Kebayoran Baru, Jakarta Selatan 12190',
    chats: {},
    settings: { notifications: true, swapOffers: true, priceDrop: false, newsletter: true },
    joinedAt: Date.now(),
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed, { settings: Object.assign(defaultState().settings, parsed.settings || {}) });
  } catch (e) {
    console.warn('State corrupted, resetting.', e);
    return defaultState();
  }
}
function saveState() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { console.warn('Persist failed', e); } }

let state = loadState();
let authMode = 'register';           // 'register' | 'login'
let currentDetailId = null;
let currentSwapTargetId = null;
let screenHistory = ['onboarding'];
let tempPhotos = [];
let marketCat = 'all';
let swapCat = 'all';

/* ───────── Helpers ───────── */
const $ = (sel, root) => (root || document).querySelector(sel);
const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
const formatPrice = n => 'Rp' + Number(n || 0).toLocaleString('id-ID');
const escapeHTML = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const allProducts = () => [...state.myListings, ...PRODUCTS];
const findProduct = id => allProducts().find(p => p.id === id);
const userName = () => (state.user && state.user.name ? state.user.name.trim().split(' ')[0] : 'Friend');

window.imgFallback = function (img, label) {
  img.onerror = null;
  const safe = escapeHTML(label || 'CIRCLO').slice(0, 24);
  img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240"><rect width="300" height="240" fill="#2F5D4B"/><circle cx="150" cy="92" r="44" fill="#AFC9AE" opacity="0.35"/><path d="M150 66c-15 13-15 33 0 45 15-12 15-32 0-45z" fill="#F5F3E8"/><text x="150" y="178" fill="#F5F3E8" font-family="Georgia,serif" font-size="17" text-anchor="middle">${safe}</text></svg>`
  );
};

let toastTimer = null;
function showToast(msg) {
  const toast = $('#toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ───────── Navigation ───────── */
const NAV_SCREENS = ['home', 'marketplace', 'swap', 'sell', 'impact', 'profile'];

function showScreen(name, push = true) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  const target = $('#screen-' + name);
  if (!target) return;
  target.classList.add('active');
  const sc = $('.screen-scroll', target);
  if (sc) sc.scrollTop = 0;

  if (push) {
    if (screenHistory[screenHistory.length - 1] !== name) screenHistory.push(name);
    if (screenHistory.length > 30) screenHistory.shift();
  }

  const nav = $('#bottomNav');
  const showNav = NAV_SCREENS.includes(name) && target.classList.contains('with-nav');
  nav.classList.toggle('visible', showNav);
  $$('#bottomNav button[data-nav]').forEach(b => b.classList.toggle('active', b.dataset.nav === name));

  if (name === 'checkout') renderCheckout();
  if (name === 'impact') renderImpact();
  if (name === 'profile') renderProfile();
  if (name === 'home') renderHome();
  if (name === 'marketplace') applyMarketFilters();
  if (name === 'swap') renderSwapList();
  if (name === 'swaprequest') renderSwapRequest();
  updateCartBadge();
}
window.showScreen = showScreen;

function historyBack() {
  screenHistory.pop();
  const prev = screenHistory[screenHistory.length - 1] || 'home';
  showScreen(prev, false);
}
window.historyBack = historyBack;

function goCategory(cat) {
  marketCat = cat;
  $('#marketSearch').value = '';
  $('#marketSort').value = 'newest';
  $('#marketCondition').value = 'all';
  $$('#marketChips .chip').forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
  showScreen('marketplace');
}
window.goCategory = goCategory;

/* ───────── Bottom nav + badge ───────── */
function updateCartBadge() {
  const badge = $('#cartBadge');
  const n = state.cart.length;
  badge.textContent = n;
  badge.style.display = n ? 'grid' : 'none';
  badge.classList.remove('pop');
  void badge.offsetWidth;
  badge.classList.add('pop');
}

/* ───────── Auth ───────── */
function goAuth(mode) { authMode = mode; renderAuthMode(); showScreen('register'); }
window.goAuth = goAuth;
function toggleAuthMode() { authMode = authMode === 'register' ? 'login' : 'register'; renderAuthMode(); }
window.toggleAuthMode = toggleAuthMode;

function renderAuthMode() {
  const isReg = authMode === 'register';
  $('#authTitle').textContent = isReg ? 'Create Your Account' : 'Welcome Back';
  $('#authSub').textContent = isReg ? 'Join the circular fashion movement.' : 'Good to see you again on Circlo.';
  $('#nameField').style.display = isReg ? '' : 'none';
  $('#termsRow').style.display = isReg ? '' : 'none';
  $('#authSubmit').textContent = isReg ? 'CREATE ACCOUNT' : 'LOG IN';
  $('#authSwitch').innerHTML = isReg ? 'Already have an account? <b>Login</b>' : 'New to Circlo? <b>Create account</b>';
  $('#authError').textContent = '';
}

function handleGetStarted() { showScreen(state.user ? 'home' : 'register'); }
window.handleGetStarted = handleGetStarted;

function handleAuth(e) {
  e.preventDefault();
  const err = $('#authError');
  const name = $('#authName').value.trim();
  const email = $('#authEmail').value.trim().toLowerCase();
  const pass = $('#authPassword').value;
  err.textContent = '';

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return err.textContent = 'Please enter a valid email address.';
  if (pass.length < 6) return err.textContent = 'Password must be at least 6 characters.';

  if (authMode === 'register') {
    if (!name) return err.textContent = 'Please tell us your name.';
    if (!$('#authTerms').checked) return err.textContent = 'Please agree to the Terms & Conditions.';
    state.user = { name, email, pass }; // demo-only local account
    state.joinedAt = Date.now();
    state.activities.unshift({ text: 'Joined Circlo — welcome to the loop!', time: 'just now' });
    saveState();
    showToast('Account created. Welcome, ' + userName() + '!');
  } else {
    if (state.user && state.user.email === email && state.user.pass === pass) {
      showToast('Welcome back, ' + userName() + '!');
    } else if (!state.user) {
      state.user = { name: email.split('@')[0].replace(/^\w/, c => c.toUpperCase()), email, pass };
      state.joinedAt = Date.now();
      saveState();
      showToast('New here — your account was created automatically.');
    } else {
      return err.textContent = 'Email or password doesn’t match our records.';
    }
  }
  $('#authForm').reset();
  showScreen('home');
}
window.handleAuth = handleAuth;

/* ───────── Product cards ───────── */
function productCardHTML(p, extraClass = '') {
  const faved = state.favorites.includes(p.id);
  return `
  <button class="product-card ${extraClass}" onclick="openDetail('${p.id}')" aria-label="${escapeHTML(p.name)}">
    <div class="pc-image">
      <img src="${p.img}" alt="${escapeHTML(p.name)}" loading="lazy" onerror="imgFallback(this,'${escapeHTML(p.name)}')">
      <span class="pc-fav ${faved ? 'faved' : ''}" onclick="event.stopPropagation();toggleFavorite('${p.id}')" role="button" aria-label="Favorite">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${faved ? 'currentColor' : 'none'}"><path d="M12 20s-7-4.5-9.3-9A5.4 5.4 0 0112 6.4 5.4 5.4 0 0121.3 11C19 15.5 12 20 12 20z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>
      </span>
      ${p.swap ? '<span class="swap-tag"><svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M7 4L3 8l4 4M3 8h13M17 20l4-4-4-4M21 16H8" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>SWAP</span>' : ''}
    </div>
    <div class="pc-body">
      <span class="pc-name">${escapeHTML(p.name)}</span>
      <span class="pc-price">${formatPrice(p.price)}</span>
      <span class="pc-meta"><span class="pc-cond">${escapeHTML(p.condition)}</span><span>★ ${p.rating.toFixed(1)}</span></span>
    </div>
  </button>`;
}

function renderHome() {
  const h = new Date().getHours();
  const part = h < 11 ? 'morning' : h < 15 ? 'afternoon' : h < 19 ? 'evening' : 'night';
  $('#greetingText').textContent = `Good ${part}, ${userName()}!`;
  const products = allProducts();
  $('#featuredRow').innerHTML = products.filter(p => p.featured).map(p => productCardHTML(p, 'featured-card')).join('') || '<p style="padding:10px 4px;color:#8a8b80;font-size:13px">No featured items yet.</p>';
  $('#recommendGrid').innerHTML = products.slice().sort((a, b) => b.rating - a.rating).slice(0, 4).map(p => productCardHTML(p)).join('');
}

function toggleFavorite(id) {
  const i = state.favorites.indexOf(id);
  if (i >= 0) state.favorites.splice(i, 1); else state.favorites.push(id);
  saveState();
  renderHome(); applyMarketFilters();
  if ($('#screen-detail').classList.contains('active')) syncDetailFav();
}
window.toggleFavorite = toggleFavorite;

/* ───────── Detail ───────── */
function openDetail(id) {
  currentDetailId = id;
  const p = findProduct(id);
  if (!p) return;
  $('#detailImage').src = p.img;
  $('#detailImage').alt = p.name;
  $('#detailImage').onerror = () => imgFallback($('#detailImage'), p.name);
  $('#detailCondition').textContent = String(p.condition).toUpperCase();
  $('#detailName').textContent = p.name;
  $('#detailPrice').textContent = formatPrice(p.price);
  $('#detailRating').textContent = p.rating.toFixed(1);
  $('#detailSales').textContent = `· ${p.sales} sold`;
  $('#detailDesc').textContent = p.desc;
  $('#detailSellerName').textContent = p.seller;
  $('#detailSellerAvatar').textContent = p.seller.charAt(0).toUpperCase();
  $('#detailSwapHint').style.display = p.swap ? '' : 'none';
  syncDetailFav();
  showScreen('detail');
}
window.openDetail = openDetail;

function syncDetailFav() {
  const btn = $('#detailFavBtn');
  const faved = state.favorites.includes(currentDetailId);
  btn.style.color = faved ? 'var(--forest)' : 'var(--forest-dark)';
  $('#detailFavBtn svg').setAttribute('fill', faved ? 'var(--forest)' : 'none');
}
window.toggleFavFromDetail = () => toggleFavorite(currentDetailId);
const currentDetailSeller = () => (findProduct(currentDetailId) || {}).seller || 'Seller';
window.currentDetailSeller = currentDetailSeller;

/* ───────── Marketplace ───────── */
function applyMarketFilters() {
  const q = ($('#marketSearch').value || '').trim().toLowerCase();
  $('#marketSearchClear').parentElement.classList.toggle('has-text', !!q);
  const sort = $('#marketSort').value;
  const cond = $('#marketCondition').value;

  let items = allProducts().filter(p => {
    const matchQ = !q || [p.name, p.category, p.seller, p.condition].join(' ').toLowerCase().includes(q);
    const matchCat = marketCat === 'all' ? true : marketCat === 'swap' ? !!p.swap : p.category === marketCat;
    const matchCond = cond === 'all' || p.condition === cond;
    return matchQ && matchCat && matchCond;
  });

  switch (sort) {
    case 'price-asc': items.sort((a, b) => a.price - b.price); break;
    case 'price-desc': items.sort((a, b) => b.price - a.price); break;
    case 'rating': items.sort((a, b) => b.rating - a.rating); break;
    default: items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
  }

  $('#marketGrid').innerHTML = items.map(p => productCardHTML(p)).join('');
  $('#marketMeta').textContent = items.length === allProducts().length ? 'All products' : `${items.length} product${items.length === 1 ? '' : 's'} found`;
  $('#marketEmpty').hidden = items.length !== 0;
  $('#marketEmptyQuery').textContent = q;
}
window.applyMarketFilters = applyMarketFilters;

function clearMarketSearch() { $('#marketSearch').value = ''; applyMarketFilters(); }
window.clearMarketSearch = clearMarketSearch;

$$('#marketChips .chip').forEach(chip => chip.addEventListener('click', () => {
  marketCat = chip.dataset.cat;
  $$('#marketChips .chip').forEach(c => c.classList.toggle('active', c === chip));
  applyMarketFilters();
}));

/* ───────── Cart / Checkout ───────── */
function addToCart(id) {
  if (!state.cart.includes(id)) state.cart.push(id);
  saveState(); updateCartBadge();
}
function buyNow() {
  const p = findProduct(currentDetailId);
  if (!p) return;
  addToCart(p.id);
  showToast('Added to cart — checkout when you’re ready.');
  showScreen('checkout');
}
window.buyNow = buyNow;

function renderCheckout() {
  const items = state.cart.map(findProduct).filter(Boolean);
  const hasItems = items.length > 0;
  $('#checkoutEmpty').hidden = hasItems;
  $('#checkoutContent').style.display = hasItems ? '' : 'none';
  if (!hasItems) return;

  $('#addressName').textContent = state.user ? state.user.name : 'Kamu';
  $('#checkoutAddress').textContent = state.address;

  $('#orderList').innerHTML = items.map(p => `
    <div class="order-item">
      <img src="${p.img}" alt="${escapeHTML(p.name)}" onerror="imgFallback(this,'${escapeHTML(p.name)}')">
      <div class="order-item-meta"><b>${escapeHTML(p.name)}</b><span>${formatPrice(p.price)}</span></div>
      <button class="order-remove" onclick="removeFromCart('${p.id}')" aria-label="Remove">×</button>
    </div>`).join('');

  const productTotal = items.reduce((sum, p) => sum + Number(p.price), 0);
  $('#productTotal').textContent = formatPrice(productTotal);
  $('#grandTotal').textContent = formatPrice(productTotal + 10000);
}

function removeFromCart(id) {
  state.cart = state.cart.filter(x => x !== id);
  saveState(); updateCartBadge(); renderCheckout();
}
window.removeFromCart = removeFromCart;

function placeOrder() {
  const items = state.cart.map(findProduct).filter(Boolean);
  if (!items.length) return;
  const payment = ($('input[name="payment"]:checked') || {}).value || 'Bank Transfer';
  const earned = 25 * items.length;

  items.forEach(p => state.purchases.unshift({ id: p.id, name: p.name, price: p.price, date: 'just now', img: p.img }));
  state.itemsRescued += items.length;
  state.points += earned;
  state.activities.unshift({ text: `Purchased ${items.length} item${items.length > 1 ? 's' : ''} via ${payment} (+${earned} pts)`, time: 'just now' });
  state.cart = [];
  saveState(); updateCartBadge();

  $('#successDetail').innerHTML = `+<b>${earned} Circlo Points</b> earned<br>${items.length} item${items.length > 1 ? 's' : ''} rescued from landfill`;
  $('#successOverlay').classList.add('open');
}
window.placeOrder = placeOrder;

function closeSuccess() {
  $('#successOverlay').classList.remove('open');
  showScreen('home');
  showToast('Thank you for shopping circular!');
}
window.closeSuccess = closeSuccess;

/* ───────── Swap ───────── */
function renderSwapList() {
  const q = ($('#swapSearch').value || '').trim().toLowerCase();
  const items = allProducts().filter(p => p.swap &&
    (swapCat === 'all' || p.category === swapCat) &&
    (!q || [p.name, p.category, p.seller].join(' ').toLowerCase().includes(q)));

  $('#swapList').innerHTML = items.map(p => `
    <div class="swap-card">
      <img class="swap-thumb" src="${p.img}" alt="${escapeHTML(p.name)}" loading="lazy" onerror="imgFallback(this,'${escapeHTML(p.name)}')">
      <div class="swap-card-body">
        <b>${escapeHTML(p.name)}</b>
        <div class="swap-wants">Wants: <em>${escapeHTML(p.wants || 'Open to offers')}</em></div>
        <button class="btn btn-sage" onclick="startSwapRequest('${p.id}')">REQUEST SWAP</button>
      </div>
    </div>`).join('') || `<div class="empty-state"><p>No swap-friendly items match${q ? ` “${escapeHTML(q)}”` : ''} yet.</p></div>`;
}
window.renderSwapList = renderSwapList;

$$('#swapChips .chip').forEach(chip => chip.addEventListener('click', () => {
  swapCat = chip.dataset.cat;
  $$('#swapChips .chip').forEach(c => c.classList.toggle('active', c === chip));
  renderSwapList();
}));

function startSwapRequest(id) { currentSwapTargetId = id; showScreen('swaprequest'); }
window.startSwapRequest = startSwapRequest;
const requestSwapFromDetail = () => startSwapRequest(currentDetailId);
window.requestSwapFromDetail = requestSwapFromDetail;

function renderSwapRequest() {
  const p = findProduct(currentSwapTargetId) || allProducts().find(x => x.swap);
  if (!p) return;
  currentSwapTargetId = p.id;
  $('#swapTargetCard').innerHTML = `
    <img src="${p.img}" alt="${escapeHTML(p.name)}" onerror="imgFallback(this,'${escapeHTML(p.name)}')">
    <div><b>${escapeHTML(p.name)}</b><small>${escapeHTML(p.condition)} · ${escapeHTML(p.seller)}</small><div class="swap-req-price">${formatPrice(p.price)}</div></div>`;

  const options = [];
  state.myListings.forEach(l => options.push(`<option value="${l.id}">${escapeHTML(l.name)} — your listing</option>`));
  options.push('<option value="demo-tote">My Preloved Tote Bag — uploaded</option>');
  options.push('<option value="demo-book">Assorted Novels (set of 4)</option>');
  $('#swapMyItem').innerHTML = options.join('');
}

function submitSwapRequest() {
  const p = findProduct(currentSwapTargetId);
  const message = $('#swapMessage').value.trim();
  const myItemText = $('#swapMyItem').selectedOptions[0] ? $('#swapMyItem').selectedOptions[0].textContent : 'My item';
  if (!p) return showToast('Please pick an item to swap.');
  if (!message) return showToast('Add a short message for the seller.');

  state.swaps.unshift({ theirId: p.id, theirName: p.name, myItem: myItemText, message, status: 'Pending', date: 'just now' });
  state.activities.unshift({ text: `Swap request sent for “${p.name}”`, time: 'just now' });
  state.points += 10;
  saveState();
  $('#swapMessage').value = 'Hi! I love this item. I’d like to swap it with mine — let me know what you think!';
  showToast('Swap request sent! +10 pts');
  showScreen('swap');
}
window.submitSwapRequest = submitSwapRequest;

/* ───────── Sell ───────── */
function handlePhotoUpload(e) {
  const files = Array.from(e.target.files || []).slice(0, 6);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = () => { tempPhotos.push(reader.result); renderPhotoPreviews(); };
    reader.readAsDataURL(file);
  });
  e.target.value = '';
}
window.handlePhotoUpload = handlePhotoUpload;

function renderPhotoPreviews() {
  $('#photoPreviews').innerHTML = tempPhotos.map((src, i) => `
    <span class="pp"><img src="${src}" alt="Photo ${i + 1}"><button onclick="removePhoto(${i})" aria-label="Remove photo">×</button></span>`).join('');
}
function removePhoto(i) { tempPhotos.splice(i, 1); renderPhotoPreviews(); }
window.removePhoto = removePhoto;

function publishItem() {
  const err = $('#sellError');
  err.textContent = '';
  const name = $('#sellName').value.trim();
  const price = Number($('#sellPrice').value);
  const desc = $('#sellDesc').value.trim();
  const condition = ($('input[name="sellCondition"]:checked') || {}).value || 'Excellent';
  const category = $('#sellCategory').value;
  if (!name) return err.textContent = 'Give your item a name.';
  if (!price || price <= 0) return err.textContent = 'Set a fair price in rupiah.';

  const listing = {
    id: 'u' + Date.now(),
    name, price, category, condition,
    seller: userName(),
    rating: 5.0, sales: 0,
    swap: $('#sellSwap').checked,
    featured: false,
    owned: true,
    img: tempPhotos[0] || '',
    desc: desc || 'Preloved item, lovingly cared for. Ask me anything!',
    wants: $('#sellSwap').checked ? 'Open to reasonable swap offers' : '',
  };
  if (!listing.img) listing.img = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240"><rect width="300" height="240" fill="#AFC9AE"/><text x="150" y="132" fill="#1B3328" font-family="Georgia,serif" font-size="22" text-anchor="middle">${escapeHTML(name.slice(0, 18))}</text></svg>`);

  state.myListings.unshift(listing);
  state.activities.unshift({ text: `Listed “${name}” for ${formatPrice(price)}`, time: 'just now' });
  state.points += 15;
  saveState();

  $('#sellName').value = ''; $('#sellPrice').value = ''; $('#sellDesc').value = '';
  tempPhotos = []; renderPhotoPreviews();
  showToast('Your item is live! +15 pts');
  showScreen('profile');
}
window.publishItem = publishItem;

/* ───────── Offer / chat ───────── */
function openOfferModal() {
  const p = findProduct(currentDetailId);
  if (!p) return;
  openModal('Make an Offer', `
    <p>Seller <b>${escapeHTML(p.seller)}</b> listed <b>${escapeHTML(p.name)}</b> at <b>${formatPrice(p.price)}</b>.</p>
    <label class="field" style="margin-top:12px"><span>YOUR OFFER (Rp)</span>
      <input type="number" id="offerInput" min="1000" step="1000" value="${Math.round(p.price * 0.85 / 1000) * 1000}" inputmode="numeric">
    </label>
    <div class="form-error" id="offerError"></div>
    <div class="modal-actions">
      <button class="btn btn-outline btn-block" onclick="closeModal()">CANCEL</button>
      <button class="btn btn-primary btn-block" onclick="submitOffer()">SEND OFFER</button>
    </div>`);
}
window.openOfferModal = openOfferModal;

function submitOffer() {
  const p = findProduct(currentDetailId);
  const input = $('#offerInput');
  const offer = Number(input.value);
  if (!offer || offer < 1000) { $('#offerError').textContent = 'Offer at least Rp1.000.'; return; }
  state.activities.unshift({ text: `Offered ${formatPrice(offer)} for “${p ? p.name : 'item'}”`, time: 'just now' });
  saveState();
  closeModal();
  showToast(`Offer of ${formatPrice(offer)} sent to ${p ? p.seller : 'seller'}.`);
}
window.submitOffer = submitOffer;

const CHAT_SEEDS = [
  { from: 'seller', text: 'Hi! Welcome to my store.' },
  { from: 'seller', text: 'Yes, this one is still available!' },
];
let currentChatSeller = 'Laras';
function openChat(seller) {
  seller = seller || 'Laras';
  currentChatSeller = seller;
  if (!state.chats[seller]) {
    state.chats[seller] = CHAT_SEEDS.map(m => ({ ...m, time: Date.now() - 1000 * 60 * 60 * 3 }));
    saveState();
  }
  $('#chatSellerName').textContent = String(seller).toUpperCase();
  $('#chatAvatar').textContent = String(seller).charAt(0).toUpperCase();
  renderChat(seller);
  showScreen('chat');
}
window.openChat = openChat;

function renderChat(seller) {
  const body = $('#chatBody');
  body.innerHTML = state.chats[seller].map(m => `
    <div class="bubble ${m.from === 'me' ? 'me' : 'seller'}">${escapeHTML(m.text)}<time>${new Date(m.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</time></div>`).join('');
  body.scrollTop = body.scrollHeight;
}

function sendChatMessage(e) {
  e.preventDefault();
  const input = $('#chatInput');
  const text = input.value.trim();
  if (!text) return;
  const seller = currentChatSeller;
  const chat = state.chats[seller] || (state.chats[seller] = []);
  chat.push({ from: 'me', text, time: Date.now() });
  input.value = '';
  state.chats[seller] = chat;
  saveState();
  renderChat(seller);

  const typing = document.createElement('div');
  typing.className = 'typing'; typing.innerHTML = '<span></span><span></span><span></span>';
  $('#chatBody').appendChild(typing);
  $('#chatBody').scrollTop = $('#chatBody').scrollHeight;

  setTimeout(() => {
    typing.remove();
    chat.push({ from: 'seller', text: botReply(text), time: Date.now() });
    state.chats[seller] = chat;
    saveState();
    if ($('#screen-chat').classList.contains('active')) renderChat(seller);
  }, 900 + Math.random() * 700);
}
window.sendChatMessage = sendChatMessage;

function botReply(text) {
  const t = text.toLowerCase();
  if (/(price|nego|bargain|discount|offer|harga|diskon)/.test(t)) return 'For the price, I can do a little discount if you bundle two items. Make an offer and I’ll consider it!';
  if (/(available|ready|ada|stok)/.test(t)) return 'Yes, it is available! First come, first served.';
  if (/(ship|kirim|delivery|ongkir|resi)/.test(t)) return 'I ship within 2 days via J&T or JNE. Ongkir Rp10.000 for Jabodetabek.';
  if (/(swap|tukar)/.test(t)) return 'I’m open to swaps for fashion items — send me a swap request with your item details!';
  if (/(condition|kondisi|defect|cacat)/.test(t)) return 'Condition is as described in the listing — honest preloved, minor signs of wear only. Ask away if you need details!';
  if (/(meet|cod|ketemu)/.test(t)) return 'COD is possible around Kebayoran Baru on weekdays after 5pm.';
  return 'Thanks for reaching out! I’ll get back to you shortly. Meanwhile, feel free to make an offer.';
}

/* ───────── Impact ───────── */
const ACHIEVEMENTS = [
  { name: 'Eco Starter', req: 1, desc: 'Rescue your 1st item' },
  { name: 'Reuse Hero', req: 10, desc: 'Rescue 10 items' },
  { name: 'Circular Legend', req: 25, desc: 'Rescue 25 items' },
];

function renderImpact() {
  $('#impactRescued').textContent = state.itemsRescued;
  $('#impactPoints').textContent = state.points;
  $('#badgeRow').innerHTML = ACHIEVEMENTS.map(a => {
    const unlocked = state.itemsRescued >= a.req;
    return `<div class="badge ${unlocked ? 'unlocked' : 'locked'}">
      <div class="badge-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3C7.5 8 7.5 15 12 18.5 16.5 15 16.5 8 12 3z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M12 18.5V21" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></div>
      <b>${a.name}</b><small>${unlocked ? 'Unlocked' : a.desc}</small>
    </div>`;
  }).join('');
  $('#activityList').innerHTML = state.activities.slice(0, 6).map(a => `
    <div class="activity-item"><span class="activity-dot"></span><span>${escapeHTML(a.text)}</span><span class="time">${escapeHTML(a.time)}</span></div>`).join('') || '<p style="padding:8px 2px;color:#8a8b80">No activity yet — your first purchase starts the loop.</p>';
}

function redeemPoints() {
  if (state.points < 100) return showToast(`Need ${100 - state.points} more pts to redeem a voucher.`);
  state.points -= 100;
  state.activities.unshift({ text: 'Redeemed 100 pts → Rp10.000 voucher', time: 'just now' });
  saveState();
  renderImpact();
  showToast('Voucher redeemed! Use code CIRCLO10K at checkout.');
}
window.redeemPoints = redeemPoints;

/* ───────── Profile ───────── */
const MENU_ITEMS = [
  { key: 'listings', label: 'My Listings', badge: () => state.myListings.length, icon: '<path d="M4 7l8-4 8 4-8 4-8-4z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M4 7v10l8 4 8-4V7" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>' },
  { key: 'purchases', label: 'My Purchases', badge: () => state.purchases.length, icon: '<path d="M6 6h15l-1.5 9h-12L5 3H2.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="20" r="1.4" stroke="currentColor" stroke-width="1.7"/><circle cx="17" cy="20" r="1.4" stroke="currentColor" stroke-width="1.7"/>' },
  { key: 'swaps', label: 'My Swap History', badge: () => state.swaps.length, icon: '<path d="M7 4L3 8l4 4M3 8h13M17 20l4-4-4-4M21 16H8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>' },
  { key: 'favorites', label: 'My Favorites', badge: () => state.favorites.length, icon: '<path d="M12 20s-7-4.5-9.3-9A5.4 5.4 0 0112 6.4 5.4 5.4 0 0121.3 11C19 15.5 12 20 12 20z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>' },
  { key: 'points', label: 'My Circlo Points', badge: () => state.points, icon: '<path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.5 6.8L12 17l-6.1 3.3 1.5-6.8L2.2 8.9l6.9-.6L12 2z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>' },
  { key: 'settings', label: 'Settings', badge: () => null, icon: '<circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.7"/><path d="M19 12a7 7 0 00-.14-1.4l2-1.5-2-3.4-2.3 1a7 7 0 00-2.4-1.4L13.8 2H10l-.34 2.7a7 7 0 00-2.4 1.4l-2.3-1-2 3.4 2 1.5A7 7 0 005 12c0 .48.05.94.14 1.4l-2 1.5 2 3.4 2.3-1a7 7 0 002.4 1.4l.32 2.7h3.9l.34-2.7a7 7 0 002.4-1.4l2.3 1 2-3.4-2-1.5c.09-.46.14-.92.14-1.4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>' },
  { key: 'help', label: 'Help & Support', badge: () => null, icon: '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M9.5 9.5a2.5 2.5 0 014.9.7c0 1.6-2.4 2-2.4 3.4M12 17h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>' },
];

function renderProfile() {
  const name = state.user ? state.user.name : 'Guest';
  $('#profileName').textContent = name;
  $('#profileEmail').textContent = state.user ? state.user.email : 'Not logged in';
  const joined = new Date(state.joinedAt || Date.now());
  $('#memberSince').textContent = 'Circlo member since ' + joined.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  const avatarBtn = $('#profileAvatar');
  if (state.avatar) {
    avatarBtn.style.backgroundImage = `url("${state.avatar}")`;
    avatarBtn.textContent = '';
  } else {
    avatarBtn.style.backgroundImage = '';
    avatarBtn.textContent = name.charAt(0).toUpperCase();
  }

  $('#profileMenu').innerHTML = MENU_ITEMS.map(m => {
    const badge = m.badge();
    return `<button class="menu-item" onclick="openProfileMenu('${m.key}')">
      <span class="mi-icon"><svg width="19" height="19" viewBox="0 0 24 24" fill="none">${m.icon}</svg></span>
      <span class="mi-label">${m.label}</span>
      ${badge !== null && badge !== undefined && badge !== 0 ? `<span class="mi-badge">${badge}</span>` : ''}
      <svg class="mi-chev" width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>`;
  }).join('');
}

function listModal(title, items, emptyText, renderRow) {
  openModal(title, items.length
    ? items.map(renderRow).join('')
    : `<p style="color:#8a8b80;text-align:center;padding:18px 6px">${emptyText}</p>`);
}

function openProfileMenu(key) {
  if (key === 'points') return showScreen('impact');

  if (key === 'listings') {
    listModal('My Listings', state.myListings, 'You haven’t listed anything yet. Tap + to sell your first item!', p => `
      <div class="modal-list-item">
        <img src="${p.img}" alt="${escapeHTML(p.name)}" onerror="imgFallback(this,'${escapeHTML(p.name)}')">
        <div><b>${escapeHTML(p.name)}</b><small>${escapeHTML(p.condition)} · ${formatPrice(p.price)}</small></div>
        <button class="mli-remove" onclick="deleteListing('${p.id}')" aria-label="Delete listing">×</button>
      </div>`);
    return;
  }
  if (key === 'purchases') {
    listModal('My Purchases', state.purchases, 'No purchases yet — your sustainable haul starts in the marketplace.', p => `
      <div class="modal-list-item">
        <img src="${p.img}" alt="${escapeHTML(p.name)}" onerror="imgFallback(this,'${escapeHTML(p.name)}')">
        <div><b>${escapeHTML(p.name)}</b><small>${escapeHTML(p.date)}</small></div>
        <span class="mli-price">${formatPrice(p.price)}</span>
      </div>`);
    return;
  }
  if (key === 'swaps') {
    listModal('Swap History', state.swaps, 'No swap requests yet. Browse Circlo Swap to start exchanging!', s => `
      <div class="modal-list-item">
        <div class="mi-icon" style="width:44px;height:44px;border-radius:12px;background:var(--sage-soft);display:grid;place-items:center;color:var(--forest-dark)"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 4L3 8l4 4M3 8h13M17 20l4-4-4-4M21 16H8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <div><b>${escapeHTML(s.theirName)}</b><small>Your item: ${escapeHTML(s.myItem)} · ${escapeHTML(s.date)}</small></div>
        <span class="mi-badge">${escapeHTML(s.status)}</span>
      </div>`);
    return;
  }
  if (key === 'favorites') {
    const favs = state.favorites.map(findProduct).filter(Boolean);
    listModal('My Favorites', favs, 'Nothing saved yet — tap the heart on any product you love.', p => `
      <div class="modal-list-item" style="cursor:pointer" onclick="closeModal();openDetail('${p.id}')">
        <img src="${p.img}" alt="${escapeHTML(p.name)}" onerror="imgFallback(this,'${escapeHTML(p.name)}')">
        <div><b>${escapeHTML(p.name)}</b><small>${escapeHTML(p.condition)} · ★ ${p.rating.toFixed(1)}</small></div>
        <span class="mli-price">${formatPrice(p.price)}</span>
      </div>`);
    return;
  }
  if (key === 'settings') {
    const s = state.settings;
    const row = (k, label) => `
      <div class="setting-row"><span>${label}</span>
        <label class="switch"><input type="checkbox" ${s[k] ? 'checked' : ''} onchange="toggleSetting('${k}')"><span class="knob"></span></label>
      </div>`;
    openModal('Settings',
      row('notifications', 'Push notifications') +
      row('swapOffers', 'Notify me about swap offers') +
      row('priceDrop', 'Price-drop alerts') +
      row('newsletter', 'The Circular — weekly newsletter'));
    return;
  }
  if (key === 'help') {
    openModal('Help & Support', `
      <p><b>How do swaps work?</b><br>Open Circlo Swap, pick an item marked as swap-friendly, choose one of your listings, and send a request. The seller decides — usually within a day.</p>
      <p><b>How do Circlo Points work?</b><br>You earn 25 pts per item purchased, 15 pts per listing published, and 10 pts per swap request. 100 pts = Rp10.000 voucher.</p>
      <p><b>Returns?</b><br>Preloved items are final sale, but not-as-described claims within 2 days are covered by buyer protection.</p>
      <p><b>Contact us</b><br>halo@circlo.id · +62 21 5550 1234<br>Mon–Sat, 09.00–18.00 WIB</p>`);
    return;
  }
}
window.openProfileMenu = openProfileMenu;

function toggleSetting(key) {
  state.settings[key] = !state.settings[key];
  saveState();
}
window.toggleSetting = toggleSetting;

function deleteListing(id) {
  state.myListings = state.myListings.filter(l => l.id !== id);
  saveState();
  closeModal();
  showToast('Listing removed.');
  renderProfile();
}
window.deleteListing = deleteListing;

function openEditProfileModal() {
  openModal('Edit Profile', `
    <label class="field"><span>FULL NAME</span><input type="text" id="editName" value="${escapeHTML(state.user ? state.user.name : '')}"></label>
    <label class="field"><span>EMAIL</span><input type="email" id="editEmail" value="${escapeHTML(state.user ? state.user.email : '')}"></label>
    <div class="form-error" id="editError"></div>
    <div class="modal-actions">
      <button class="btn btn-outline btn-block" onclick="closeModal()">CANCEL</button>
      <button class="btn btn-primary btn-block" onclick="saveProfileEdit()">SAVE</button>
    </div>`);
}
window.openEditProfileModal = openEditProfileModal;

function saveProfileEdit() {
  const name = $('#editName').value.trim();
  const email = $('#editEmail').value.trim().toLowerCase();
  if (!name) { $('#editError').textContent = 'Name can’t be empty.'; return; }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { $('#editError').textContent = 'Please enter a valid email.'; return; }
  if (!state.user) state.user = { pass: '' };
  state.user.name = name; state.user.email = email;
  saveState(); closeModal(); renderProfile(); renderHome();
  showToast('Profile updated.');
}
window.saveProfileEdit = saveProfileEdit;

function handleAvatarUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => { state.avatar = reader.result; saveState(); renderProfile(); showToast('Looking good!'); };
  reader.readAsDataURL(file);
  e.target.value = '';
}
window.handleAvatarUpload = handleAvatarUpload;

function confirmLogout() {
  openModal('Log Out', `
    <p>Log out of Circlo on this device? Your listings, points and swap history stay saved.</p>
    <div class="modal-actions">
      <button class="btn btn-outline btn-block" onclick="closeModal()">STAY</button>
      <button class="btn btn-primary btn-block" onclick="doLogout()">LOG OUT</button>
    </div>`);
}
window.confirmLogout = confirmLogout;

function doLogout() {
  state.user = null;
  saveState();
  closeModal();
  showScreen('onboarding');
  showToast('Logged out. See you soon!');
}
window.doLogout = doLogout;

/* ───────── Address ───────── */
function openAddressModal() {
  openModal('Delivery Address', `
    <label class="field"><span>ADDRESS</span>
      <textarea class="textarea" id="addressInput" rows="3">${escapeHTML(state.address)}</textarea>
    </label>
    <div class="modal-actions">
      <button class="btn btn-outline btn-block" onclick="closeModal()">CANCEL</button>
      <button class="btn btn-primary btn-block" onclick="saveAddress()">SAVE ADDRESS</button>
    </div>`);
}
window.openAddressModal = openAddressModal;

function saveAddress() {
  const v = $('#addressInput').value.trim();
  if (v.length < 10) { showToast('Please enter a complete address.'); return; }
  state.address = v;
  saveState(); closeModal(); renderCheckout();
  showToast('Address updated.');
}
window.saveAddress = saveAddress;

/* ───────── Modal plumbing ───────── */
function openModal(title, bodyHTML) {
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = bodyHTML;
  $('#modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  $('#modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
window.closeModal = closeModal;
function onOverlayClick(e) { if (e.target === $('#modalOverlay')) closeModal(); }
window.onOverlayClick = onOverlayClick;

function openModalText(kind) {
  if (kind === 'terms') {
    openModal('Terms & Conditions', `
      <p><b>1. The Circular Promise</b><br>By buying, selling or swapping on Circlo you agree to keep goods in use, describe them honestly, and package them with minimal waste.</p>
      <p><b>2. Listings</b><br>All items are preloved and sold as-is. Photos must show real condition, including flaws. Misleading listings are removed and may forfeit points.</p>
      <p><b>3. Swaps</b><br>Swaps are direct agreements between members. Ship both items tracked; disputes are settled via our protection program within 14 days.</p>
      <p><b>4. Circlo Points</b><br>Points are loyalty rewards, have no cash value, and may expire after 24 months of inactivity.</p>
      <p><b>5. Privacy</b><br>Your data lives on your device for this demo. Addresses and contact details are never shared publicly.</p>`);
  }
}
window.openModalText = openModalText;

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ───────── Status bar clock ───────── */
function tickClock() {
  const now = new Date();
  $('#sbTime').textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace(':', '.');
}
setInterval(tickClock, 1000); tickClock();

/* ───────── Side navigator ───────── */
$('#navigatorGrid').innerHTML = SCREENS.map(([key, num, label]) =>
  `<button class="nav-jump" onclick="showScreen('${key}')"><small>${num}</small>${label}</button>`).join('');

/* ───────── Boot ───────── */
renderAuthMode();
renderHome();
applyMarketFilters();
updateCartBadge();
showScreen(state.user ? 'home' : 'onboarding', false);
