import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Package, 
  Settings, 
  Plus, 
  Trash2, 
  Save, 
  DollarSign, 
  Truck, 
  Users, 
  Megaphone, 
  Warehouse,
  FileText,
  LogOut,
  MapPin,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  LayoutDashboard,
  Store,
  Globe,
  ShoppingCart,
  Search,
  Shield,
  UserCog,
  Eye,
  Lock
} from 'lucide-react';

// --- UTILIDADES UI ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
    {children}
  </div>
);

const InputGroup = ({ label, children, subLabel = null, error = null }) => (
  <div className="flex flex-col space-y-1.5">
    <label className="text-sm font-semibold text-gray-700 flex justify-between items-end">
      {label}
      {subLabel && <span className="text-xs text-gray-400 font-normal">{subLabel}</span>}
    </label>
    {children}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

const Button = ({ children, variant = "primary", onClick, className = "", type = "button", disabled = false }) => {
  const baseStyle = "px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-200",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100"
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Badge = ({ type, text }) => {
  const styles = {
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    gray: "bg-gray-100 text-gray-800"
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${styles[type] || styles.info}`}>
      {text}
    </span>
  );
};

// --- DATA INICIAL (Simulación de Base de Datos) ---
const INITIAL_USERS = [
  { id: 1, name: 'Administrador Principal', email: 'admin@costopro.com', password: '123', role: 'admin' },
  { id: 2, name: 'Vendedor Junior', email: 'user@costopro.com', password: '123', role: 'user' },
  { id: 3, name: 'Auditor Externo', email: 'visor@costopro.com', password: '123', role: 'viewer' },
];

// --- COMPONENTE DE LOGIN ---

const LoginScreen = ({ onLogin, users }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      setIsLoading(false);
      // Validar contra la lista de usuarios
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        onLogin(foundUser);
      } else {
        setError("Credenciales inválidas. Prueba: admin@costopro.com / 123");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl border-t-4 border-indigo-600 animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 text-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
            <Calculator size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Bienvenido a CostoPro</h1>
          <p className="text-gray-500 mt-2">Gestión de Precios para Perú</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          <InputGroup label="Correo Electrónico">
            <input 
              type="email" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
              placeholder="ej. admin@costopro.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup label="Contraseña">
            <input 
              type="password" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
              placeholder="••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          
          <Button type="submit" variant="primary" className="w-full py-3" disabled={isLoading}>
            {isLoading ? "Verificando..." : "Ingresar al Sistema"}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-400 space-y-1">
          <p>Roles Demo:</p>
          <p>Admin: admin@costopro.com / 123</p>
          <p>Usuario: user@costopro.com / 123</p>
          <p>Visor: visor@costopro.com / 123</p>
        </div>
      </Card>
    </div>
  );
};

// --- APLICACIÓN PRINCIPAL ---

export default function App() {
  // --- ESTADO GLOBAL ---
  const [user, setUser] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [exchangeRate, setExchangeRate] = useState(3.75);
  
  // Base de datos de Usuarios
  const [dbUsers, setDbUsers] = useState(() => {
    const saved = localStorage.getItem('costApp_users_db');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // Persistencia
  useEffect(() => {
    localStorage.setItem('costApp_users_db', JSON.stringify(dbUsers));
  }, [dbUsers]);

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('costApp_inventory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem('costApp_inventory', JSON.stringify(inventory));
  }, [inventory, user]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('costApp_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('costApp_user');
    setActiveView('dashboard');
  };

  // --- ESTADO CALCULADORA ---
  const [formData, setFormData] = useState({
    productName: '',
    brand: '',
    supplier: '',
    zone: 'lima_centro',
    quantity: 1,
    unitType: 'cajas',
    unitsPerPackage: 12,
    currency: 'PEN',
    priceTotal: 0,
    // Nuevos campos de costos
    costTransport: 0, // Flete
    costLoad: 0,      // Carga/Descarga (Nuevo, separado de Labor)
    costLabor: 0,     // Mano de Obra (Empaquetado, etiquetado, etc)
    costStorage: 0,   // Almacén
    costAds: 0,       // Publicidad
    costSourcing: 0,  // Búsqueda
    costOther: 0,     // Otros
    marginPercent: 30,
  });

  // --- LÓGICA DE CÁLCULO ---
  const calculations = useMemo(() => {
    const basePriceInSoles = formData.currency === 'USD' 
      ? parseFloat(formData.priceTotal || 0) * exchangeRate 
      : parseFloat(formData.priceTotal || 0);

    const indirectCosts = 
      parseFloat(formData.costTransport || 0) +
      parseFloat(formData.costLoad || 0) +
      parseFloat(formData.costLabor || 0) +
      parseFloat(formData.costStorage || 0) +
      parseFloat(formData.costAds || 0) +
      parseFloat(formData.costSourcing || 0) +
      parseFloat(formData.costOther || 0);

    const totalAcquisitionCost = basePriceInSoles + indirectCosts;

    const totalUnits = formData.unitType === 'unidades' 
      ? parseFloat(formData.quantity || 1) 
      : parseFloat(formData.quantity || 1) * parseFloat(formData.unitsPerPackage || 1);

    const unitCost = totalUnits > 0 ? totalAcquisitionCost / totalUnits : 0;
    const suggestedPrice = unitCost * (1 + (parseFloat(formData.marginPercent || 0) / 100));
    const profitUnit = suggestedPrice - unitCost;

    return { basePriceInSoles, indirectCosts, totalAcquisitionCost, totalUnits, unitCost, suggestedPrice, profitUnit };
  }, [formData, exchangeRate]);

  // --- LÓGICA DE MERCADO ---
  const marketAnalysis = useMemo(() => {
    if (calculations.unitCost === 0) return null;
    const zoneFactors = {
      'lima_centro': { min: 1.25, max: 1.40, label: "Lima: Mercado Central / Gamarra" },
      'lima_norte': { min: 1.30, max: 1.45, label: "Lima Norte: Mercados Populares" },
      'lima_sur': { min: 1.35, max: 1.55, label: "Lima Sur: Zonas Residenciales" },
      'lima_top': { min: 1.80, max: 2.50, label: "Lima Moderna: San Isidro / Miraflores" },
      'prov_norte': { min: 1.35, max: 1.60, label: "Norte (Trujillo/Piura/Chiclayo)" },
      'prov_sur': { min: 1.40, max: 1.65, label: "Sur (Arequipa/Cusco/Tacna)" },
      'prov_centro': { min: 1.30, max: 1.50, label: "Sierra Central (Huancayo/Ayacucho)" },
      'prov_selva': { min: 1.45, max: 1.75, label: "Selva (Iquitos/Tarapoto) - Flete Alto" },
      'web_marketplace': { min: 1.50, max: 1.80, label: "Marketplace (ML/Linio/Falabella)" },
      'web_social': { min: 1.20, max: 1.40, label: "Redes Sociales (FB/IG/TikTok)" },
      'web_propia': { min: 1.60, max: 2.20, label: "E-commerce Propio (Web)" },
    };
    const factor = zoneFactors[formData.zone] || zoneFactors['lima_centro'];
    const marketLow = calculations.unitCost * factor.min;
    const marketHigh = calculations.unitCost * factor.max;
    const marketAvg = (marketLow + marketHigh) / 2;

    let status = "competitive";
    let message = "";
    if (calculations.suggestedPrice < marketLow) {
      status = "cheap"; message = "Precio riesgoso (Muy bajo).";
    } else if (calculations.suggestedPrice > marketHigh) {
      status = "expensive"; message = "Precio elevado para la zona.";
    } else {
      status = "competitive"; message = "Precio Óptimo.";
    }
    return { marketLow, marketHigh, marketAvg, status, message, zoneLabel: factor.label };
  }, [calculations, formData.zone]);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProduct = () => {
    if (user?.role === 'viewer') {
      alert("Modo Visor: No tienes permisos para guardar.");
      return;
    }
    if (!formData.productName || calculations.unitCost <= 0) {
      alert("Faltan datos clave para guardar.");
      return;
    }
    const newProduct = {
      id: Date.now(),
      date: new Date().toISOString(),
      author: user.name,
      ...formData,
      calculations: { ...calculations },
      marketAnalysis: { ...marketAnalysis }
    };
    setInventory([newProduct, ...inventory]);
    alert("Producto guardado y analizado.");
  };

  const formatMoney = (amount) => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', minimumFractionDigits: 2 }).format(amount);

  // --- GESTIÓN DE USUARIOS ---
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) return alert("Completa todos los campos");
    if (dbUsers.some(u => u.email === newUser.email)) return alert("El correo ya existe");
    
    setDbUsers([...dbUsers, { ...newUser, id: Date.now() }]);
    setNewUser({ name: '', email: '', password: '', role: 'user' });
    alert("Usuario creado correctamente");
  };

  const handleDeleteUser = (id) => {
    if (id === 1 || id === user.id) return alert("No puedes eliminar este usuario");
    if (confirm("¿Eliminar usuario del sistema?")) {
      setDbUsers(dbUsers.filter(u => u.id !== id));
    }
  };

  // --- VISTAS ---

  if (!user) return <LoginScreen onLogin={handleLogin} users={dbUsers} />;

  const renderUsers = () => {
    const isAdmin = user.role === 'admin';

    return (
      <div className="space-y-6 animate-in fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h2>
            <p className="text-sm text-gray-500">Control de acceso y roles del sistema</p>
          </div>
          {!isAdmin && (
             <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
               <Shield size={16}/> Modo Lectura (No eres Administrador)
             </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulario (Solo Admin) */}
          {isAdmin && (
            <Card className="p-6 h-fit">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Plus size={18} className="text-indigo-600"/> Nuevo Usuario
              </h3>
              <div className="space-y-4">
                <InputGroup label="Nombre Completo">
                  <input className="input-std" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} placeholder="Ej. Juan Pérez"/>
                </InputGroup>
                <InputGroup label="Correo Electrónico">
                  <input className="input-std" type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} placeholder="juan@empresa.com"/>
                </InputGroup>
                <InputGroup label="Contraseña Temporal">
                  <input className="input-std" type="password" value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} placeholder="••••••"/>
                </InputGroup>
                <InputGroup label="Rol de Acceso">
                  <select className="input-std bg-white" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})}>
                    <option value="user">Usuario (Operador)</option>
                    <option value="viewer">Visor (Solo Lectura)</option>
                    <option value="admin">Administrador</option>
                  </select>
                </InputGroup>
                <Button onClick={handleAddUser} className="w-full mt-2">Crear Usuario</Button>
              </div>
            </Card>
          )}

          {/* Lista de Usuarios */}
          <Card className={`p-0 overflow-hidden ${isAdmin ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="p-4">Usuario</th>
                  <th className="p-4">Rol</th>
                  <th className="p-4">Acceso</th>
                  {isAdmin && <th className="p-4 text-center">Acciones</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dbUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{u.name}</div>
                      <div className="text-xs text-gray-500">{u.email}</div>
                    </td>
                    <td className="p-4">
                      {u.role === 'admin' && <Badge type="purple" text="Administrador" />}
                      {u.role === 'user' && <Badge type="info" text="Usuario" />}
                      {u.role === 'viewer' && <Badge type="gray" text="Visor" />}
                    </td>
                    <td className="p-4 text-gray-500 text-xs">
                      {u.role === 'admin' ? 'Control Total' : u.role === 'user' ? 'Calcular/Guardar' : 'Solo Lectura'}
                    </td>
                    {isAdmin && (
                      <td className="p-4 text-center">
                        {u.id !== 1 && u.id !== user.id ? (
                          <button onClick={() => handleDeleteUser(u.id)} className="text-gray-400 hover:text-red-600 transition p-2 hover:bg-red-50 rounded-full">
                            <Trash2 size={18}/>
                          </button>
                        ) : (
                          <Lock size={16} className="text-gray-300 mx-auto"/>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    );
  };

  const renderCalculator = () => (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 animate-in slide-in-from-right duration-300">
      
      {/* Columna Izquierda: Datos */}
      <div className="xl:col-span-7 space-y-6">
        <Card className="p-6">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-6 pb-2 border-b">
            <Package className="text-indigo-600" size={20}/> 1. Datos del Producto & Zona
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputGroup label="Nombre Producto">
              <input name="productName" value={formData.productName} onChange={handleInputChange} className="input-std" placeholder="Ej. Polos de Algodón" />
            </InputGroup>
            <InputGroup label="Zona / Canal de Venta">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={16}/>
                <select name="zone" value={formData.zone} onChange={handleInputChange} className="input-std pl-9 bg-white">
                  <optgroup label="Lima Metropolitana">
                    <option value="lima_centro">Mercado Central / Gamarra</option>
                    <option value="lima_norte">Lima Norte / Mercados</option>
                    <option value="lima_sur">Lima Sur / Residencial</option>
                    <option value="lima_top">Zona Exclusiva / Malls</option>
                  </optgroup>
                  <optgroup label="Provincias">
                    <option value="prov_norte">Norte (Trujillo/Piura)</option>
                    <option value="prov_sur">Sur (Arequipa/Cusco)</option>
                    <option value="prov_centro">Centro (Huancayo)</option>
                    <option value="prov_selva">Selva (Iquitos/Pucallpa)</option>
                  </optgroup>
                  <optgroup label="Canales Digitales">
                    <option value="web_marketplace">Marketplace (ML/Falabella)</option>
                    <option value="web_social">Redes Sociales (FB/IG)</option>
                    <option value="web_propia">E-commerce Propio</option>
                  </optgroup>
                </select>
              </div>
            </InputGroup>
            <InputGroup label="Marca">
               <input name="brand" value={formData.brand} onChange={handleInputChange} className="input-std" placeholder="Ej. Genérico" />
            </InputGroup>
             <InputGroup label="Proveedor">
               <input name="supplier" value={formData.supplier} onChange={handleInputChange} className="input-std" placeholder="Ej. Textil SAC" />
            </InputGroup>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-6 pb-2 border-b">
            <DollarSign className="text-indigo-600" size={20}/> 2. Costos de Adquisición
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
             <div className="md:col-span-1">
               <InputGroup label="Moneda Factura">
                 <select name="currency" value={formData.currency} onChange={handleInputChange} className="input-std bg-gray-50">
                   <option value="PEN">Soles (S/)</option>
                   <option value="USD">Dólares ($)</option>
                 </select>
               </InputGroup>
             </div>
             <div className="md:col-span-2">
               <InputGroup label="Total Factura de Compra">
                 <input type="number" name="priceTotal" value={formData.priceTotal} onChange={handleInputChange} className="input-std font-mono font-bold" placeholder="0.00" />
               </InputGroup>
             </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 border border-slate-200">
            <InputGroup label="Cantidad Comprada">
              <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} className="input-std bg-white" />
            </InputGroup>
            <InputGroup label="Presentación">
              <select name="unitType" value={formData.unitType} onChange={handleInputChange} className="input-std bg-white">
                <option value="cajas">Cajas / Bultos</option>
                <option value="unidades">Unidades Sueltas</option>
              </select>
            </InputGroup>
            {formData.unitType === 'cajas' && (
              <InputGroup label="Unidades por Caja">
                <input type="number" name="unitsPerPackage" value={formData.unitsPerPackage} onChange={handleInputChange} className="input-std bg-white" />
              </InputGroup>
            )}
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-indigo-600">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-6 pb-2 border-b">
            <Truck className="text-indigo-600" size={20}/> 3. Costos Indirectos Completa (Soles)
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {/* Logística Básica */}
             <InputGroup label="Flete/Transporte">
                <div className="relative">
                  <Truck size={14} className="absolute left-2.5 top-3 text-gray-400"/>
                  <input type="number" name="costTransport" value={formData.costTransport} onChange={handleInputChange} className="input-std pl-8 text-sm" placeholder="0.00" />
                </div>
             </InputGroup>
             <InputGroup label="Carga/Descarga">
                <div className="relative">
                  <Package size={14} className="absolute left-2.5 top-3 text-gray-400"/>
                  <input type="number" name="costLoad" value={formData.costLoad} onChange={handleInputChange} className="input-std pl-8 text-sm" placeholder="0.00" />
                </div>
             </InputGroup>
             <InputGroup label="Almacén">
                <div className="relative">
                  <Warehouse size={14} className="absolute left-2.5 top-3 text-gray-400"/>
                  <input type="number" name="costStorage" value={formData.costStorage} onChange={handleInputChange} className="input-std pl-8 text-sm" placeholder="0.00" />
                </div>
             </InputGroup>

             {/* Nuevos Campos Solicitados */}
             <InputGroup label="Mano de Obra">
                <div className="relative">
                  <Users size={14} className="absolute left-2.5 top-3 text-gray-400"/>
                  <input type="number" name="costLabor" value={formData.costLabor} onChange={handleInputChange} className="input-std pl-8 text-sm" placeholder="Personal" />
                </div>
             </InputGroup>
             <InputGroup label="Publicidad">
                <div className="relative">
                  <Megaphone size={14} className="absolute left-2.5 top-3 text-gray-400"/>
                  <input type="number" name="costAds" value={formData.costAds} onChange={handleInputChange} className="input-std pl-8 text-sm" placeholder="Marketing" />
                </div>
             </InputGroup>
             <InputGroup label="Búsqueda/Gestión">
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-3 text-gray-400"/>
                  <input type="number" name="costSourcing" value={formData.costSourcing} onChange={handleInputChange} className="input-std pl-8 text-sm" placeholder="Sourcing" />
                </div>
             </InputGroup>

             <InputGroup label="Otros Gastos">
                <div className="relative">
                  <Settings size={14} className="absolute left-2.5 top-3 text-gray-400"/>
                  <input type="number" name="costOther" value={formData.costOther} onChange={handleInputChange} className="input-std pl-8 text-sm" placeholder="Varios" />
                </div>
             </InputGroup>
          </div>
          <div className="mt-4 pt-4 border-t flex justify-end">
            <span className="text-sm font-semibold text-gray-600 mr-2">Total Indirectos:</span>
            <span className="text-sm font-bold text-indigo-600">{formatMoney(calculations.indirectCosts)}</span>
          </div>
        </Card>
      </div>

      {/* Columna Derecha: Resultados */}
      <div className="xl:col-span-5 space-y-6">
        <div className="bg-slate-900 text-white rounded-xl shadow-2xl overflow-hidden sticky top-6">
          <div className="p-6">
            <h2 className="text-lg font-bold text-slate-300 uppercase tracking-wider mb-6">Análisis de Costos</h2>
            
            <div className="flex justify-between items-end mb-2">
              <span className="text-slate-400 text-sm">Costo Unitario Real</span>
              <span className="text-3xl font-bold text-white">{formatMoney(calculations.unitCost)}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full mb-6">
              <div className="bg-indigo-500 h-2 rounded-full" style={{width: '60%'}}></div>
            </div>

            <InputGroup label={<span className="text-indigo-200">Margen de Ganancia (%)</span>}>
               <div className="flex gap-4 items-center mt-2">
                 <input 
                   type="range" min="0" max="200" 
                   value={formData.marginPercent} 
                   onChange={(e) => setFormData({...formData, marginPercent: e.target.value})}
                   className="flex-1 accent-indigo-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                 />
                 <span className="text-xl font-bold w-16 text-right">{formData.marginPercent}%</span>
               </div>
            </InputGroup>

            <div className="mt-8 pt-8 border-t border-slate-700 grid grid-cols-2 gap-8">
              <div>
                <span className="text-slate-400 text-xs uppercase block">Precio Sugerido</span>
                <span className="text-2xl font-bold text-emerald-400 block mt-1">{formatMoney(calculations.suggestedPrice)}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-xs uppercase block">Ganancia Neta</span>
                <span className="text-2xl font-bold text-blue-400 block mt-1">{formatMoney(calculations.profitUnit)}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleSaveProduct} 
            disabled={user.role === 'viewer'}
            className={`w-full font-medium py-4 transition flex items-center justify-center gap-2 ${user.role === 'viewer' ? 'bg-slate-700 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
          >
            {user.role === 'viewer' ? <><Eye size={20}/> Solo Lectura</> : <><Save size={20}/> Guardar Cálculo</>}
          </button>
        </div>

        {marketAnalysis && (
          <Card className="p-0 overflow-hidden border-2 border-indigo-50">
            <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex items-center gap-2">
               {formData.zone.includes('web') ? <Globe className="text-indigo-600" size={20} /> : <Store className="text-indigo-600" size={20} />}
               <h3 className="font-bold text-indigo-900">Radar: {marketAnalysis.zoneLabel}</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase text-gray-500">Promedio Canal</span>
                <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded">{formatMoney(marketAnalysis.marketAvg)}</span>
              </div>
              <div className="relative pt-6 pb-2">
                <div className="h-3 bg-gray-200 rounded-full w-full relative">
                  <div className="absolute h-full bg-indigo-200 rounded-full" style={{left: '20%', right: '20%'}}></div>
                  <div 
                    className={`absolute w-4 h-4 rounded-full border-2 border-white shadow top-1/2 -translate-y-1/2 transition-all duration-500 ${marketAnalysis.status === 'competitive' ? 'bg-emerald-500' : marketAnalysis.status === 'expensive' ? 'bg-red-500' : 'bg-amber-500'}`}
                    style={{left: marketAnalysis.status === 'cheap' ? '10%' : marketAnalysis.status === 'expensive' ? '90%' : '50%'}}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                  <span>Barato</span><span>Promedio</span><span>Caro</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600 text-center font-medium">{marketAnalysis.message}</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-gray-800">Hola, {user.name} 👋</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-l-indigo-500 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Valor Total Inventario</p>
            <h3 className="text-3xl font-bold text-gray-800">{formatMoney(inventory.reduce((acc, i) => acc + i.calculations.totalAcquisitionCost, 0))}</h3>
          </div>
          <div className="p-3 bg-indigo-50 rounded-full text-indigo-600"><DollarSign size={24} /></div>
        </Card>
        <Card className="p-6 border-l-4 border-l-emerald-500 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Productos Registrados</p>
            <h3 className="text-3xl font-bold text-gray-800">{inventory.length}</h3>
          </div>
          <div className="p-3 bg-emerald-50 rounded-full text-emerald-600"><Package size={24} /></div>
        </Card>
        <Card className="p-6 border-l-4 border-l-amber-500 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Rol Actual</p>
            <h3 className="text-xl font-bold text-gray-800 capitalize">{user.role}</h3>
          </div>
          <div className="p-3 bg-amber-50 rounded-full text-amber-600"><Shield size={24} /></div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
           <h3 className="font-bold text-gray-800 mb-4">Productos Recientes</h3>
           {inventory.length === 0 ? (
             <p className="text-sm text-gray-400 italic">No hay productos registrados.</p>
           ) : (
             <div className="space-y-3">
               {inventory.slice(0, 3).map(item => (
                 <div key={item.id} className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded">
                   <div>
                      <span className="font-medium text-gray-700 block">{item.productName}</span>
                      <span className="text-xs text-gray-400">Por: {item.author || 'Desconocido'}</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-gray-500">{formatMoney(item.calculations.suggestedPrice)}</span>
                      {item.marketAnalysis?.status === 'competitive' && <Badge type="success" text="OK" />}
                   </div>
                 </div>
               ))}
             </div>
           )}
           <Button variant="ghost" onClick={() => setActiveView('inventory')} className="w-full mt-4 text-sm text-indigo-600">Ver todo el historial</Button>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 bg-white border-r flex-col fixed h-full z-10">
        <div className="h-16 flex items-center px-6 border-b">
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg mr-2"><Calculator size={20} /></div>
          <span className="font-bold text-xl text-gray-800">CostoPro</span>
        </div>
        
        <nav className="p-4 space-y-1 flex-1">
          <button onClick={() => setActiveView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeView === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            <LayoutDashboard size={20}/> Dashboard
          </button>
          <button onClick={() => setActiveView('calculator')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeView === 'calculator' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            <Calculator size={20}/> Calculadora
          </button>
          <button onClick={() => setActiveView('inventory')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeView === 'inventory' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            <BarChart3 size={20}/> Mis Productos
          </button>
          <button onClick={() => setActiveView('users')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeView === 'users' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}>
            <UserCog size={20}/> Usuarios
          </button>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs uppercase">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate capitalize">{user.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-sm text-red-600 hover:bg-red-50 p-2 rounded-lg transition">
            <LogOut size={16}/> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full bg-white border-b z-20 px-4 h-16 flex items-center justify-between">
         <div className="flex items-center gap-2 font-bold text-gray-800">
           <Calculator className="text-indigo-600"/> CostoPro
         </div>
         <button onClick={handleLogout}><LogOut size={20} className="text-gray-500"/></button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8 pb-24">
        {activeView === 'dashboard' && renderDashboard()}
        {activeView === 'calculator' && renderCalculator()}
        {activeView === 'users' && renderUsers()}
        {activeView === 'inventory' && (
           <div className="space-y-6">
             <div className="flex justify-between items-center">
               <h2 className="text-2xl font-bold text-gray-800">Historial</h2>
             </div>
             <Card className="overflow-hidden">
               <table className="w-full text-sm text-left">
                 <thead className="bg-gray-50">
                   <tr><th className="p-4">Producto</th><th className="p-4 text-right">Costo</th><th className="p-4 text-right">Venta</th><th className="p-4 text-center">Acciones</th></tr>
                 </thead>
                 <tbody>
                   {inventory.map(item => (
                     <tr key={item.id} className="border-t hover:bg-slate-50">
                       <td className="p-4 font-medium">{item.productName}</td>
                       <td className="p-4 text-right text-blue-600">{formatMoney(item.calculations.unitCost)}</td>
                       <td className="p-4 text-right font-bold">{formatMoney(item.calculations.suggestedPrice)}</td>
                       <td className="p-4 text-center">
                         {user.role !== 'viewer' && (
                           <button onClick={() => setInventory(inventory.filter(i => i.id !== item.id))} className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                         )}
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </Card>
           </div>
        )}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 w-full bg-white border-t flex justify-around p-2 pb-safe z-20">
        <button onClick={() => setActiveView('dashboard')} className={`p-2 rounded-lg flex flex-col items-center ${activeView === 'dashboard' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <LayoutDashboard size={24}/> <span className="text-[10px]">Inicio</span>
        </button>
        <button onClick={() => setActiveView('calculator')} className={`p-2 rounded-lg flex flex-col items-center ${activeView === 'calculator' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <Plus size={24}/> <span className="text-[10px]">Calcular</span>
        </button>
        <button onClick={() => setActiveView('users')} className={`p-2 rounded-lg flex flex-col items-center ${activeView === 'users' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <UserCog size={24}/> <span className="text-[10px]">Usuarios</span>
        </button>
      </div>
      <style>{`
        .input-std { width: 100%; padding: 0.625rem; border-radius: 0.5rem; border: 1px solid #e2e8f0; outline: none; font-size: 0.875rem; transition: all 0.2s; }
        .input-std:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1); }
      `}</style>
    </div>
  );
}