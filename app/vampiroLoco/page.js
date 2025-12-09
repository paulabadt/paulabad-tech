'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Filter, Download, Edit2, Save, X, Eye, Phone, Mail, Calendar, TrendingUp, AlertCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react';

export default function VampiroLoco() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [selectedLead, setSelectedLead] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

    // Al inicio del componente
    useEffect(() => {
    const secret = prompt('Ingresa el código de acceso:');
    if (secret !== 'tuClaveSecreta123') {
        window.location.href = '/';
    }
    }, []);

  // Cargar leads
  useEffect(() => {
    loadLeads();
  }, []);

  // Filtrar leads
  useEffect(() => {
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone?.includes(searchTerm) ||
        lead.website_url?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'todos') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
  }, [searchTerm, statusFilter, leads]);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
      setFilteredLeads(data || []);
    } catch (error) {
      console.error('Error cargando leads:', error);
      alert('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);

      if (error) throw error;
      loadLeads();
      alert('Estado actualizado');
    } catch (error) {
      console.error('Error actualizando estado:', error);
      alert('Error al actualizar');
    }
  };

  const saveLeadChanges = async () => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({
          name: editData.name,
          phone: editData.phone,
          website_url: editData.website_url,
          notes: editData.notes,
          follow_up_date: editData.follow_up_date,
          status: editData.status
        })
        .eq('id', selectedLead.id);

      if (error) throw error;
      
      setEditMode(false);
      setSelectedLead({ ...selectedLead, ...editData });
      loadLeads();
      alert('Cambios guardados exitosamente');
    } catch (error) {
      console.error('Error guardando cambios:', error);
      alert('Error al guardar cambios');
    }
  };

  const exportToCSV = () => {
    const headers = ['Informe #', 'Nombre', 'Teléfono', 'Sitio Web', 'Estado', 'Fecha', 'Performance', 'SEO'];
    const rows = filteredLeads.map(lead => [
      lead.report_number,
      lead.name,
      lead.phone,
      lead.website_url,
      lead.status,
      new Date(lead.created_at).toLocaleDateString('es-CO'),
      lead.performance_score,
      lead.seo_score
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getStatusColor = (status) => {
    const colors = {
      'nuevo': 'bg-blue-100 text-blue-800 border-blue-200',
      'contactado': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'interesado': 'bg-purple-100 text-purple-800 border-purple-200',
      'negociando': 'bg-orange-100 text-orange-800 border-orange-200',
      'cerrado': 'bg-green-100 text-green-800 border-green-200',
      'perdido': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'nuevo': <AlertCircle className="w-4 h-4" />,
      'contactado': <Phone className="w-4 h-4" />,
      'interesado': <Eye className="w-4 h-4" />,
      'negociando': <TrendingUp className="w-4 h-4" />,
      'cerrado': <CheckCircle className="w-4 h-4" />,
      'perdido': <X className="w-4 h-4" />
    };
    return icons[status] || <Clock className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Leads</h1>
              <p className="text-sm text-gray-500">Gestión de análisis web</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Exportar CSV
              </button>
              <button
                onClick={loadLeads}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Leads</p>
            <p className="text-3xl font-bold text-gray-900">{leads.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Nuevos</p>
            <p className="text-3xl font-bold text-blue-600">
              {leads.filter(l => l.status === 'nuevo').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">En Negociación</p>
            <p className="text-3xl font-bold text-orange-600">
              {leads.filter(l => l.status === 'negociando').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Cerrados</p>
            <p className="text-3xl font-bold text-green-600">
              {leads.filter(l => l.status === 'cerrado').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, teléfono o sitio web..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                <option value="todos">Todos los estados</option>
                <option value="nuevo">Nuevo</option>
                <option value="contactado">Contactado</option>
                <option value="interesado">Interesado</option>
                <option value="negociando">Negociando</option>
                <option value="cerrado">Cerrado</option>
                <option value="perdido">Perdido</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Informe #</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Cliente</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contacto</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Sitio Web</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Scores</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Estado</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fecha</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-mono text-sm font-semibold text-purple-600">
                        #{lead.report_number || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{lead.name}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <a 
                          href={`https://wa.me/${lead.phone?.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
                        >
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <a 
                        href={lead.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="truncate max-w-[200px]">{lead.website_url}</span>
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 text-xs">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                          P: {lead.performance_score}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                          SEO: {lead.seo_score}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)} cursor-pointer`}
                      >
                        <option value="nuevo">Nuevo</option>
                        <option value="contactado">Contactado</option>
                        <option value="interesado">Interesado</option>
                        <option value="negociando">Negociando</option>
                        <option value="cerrado">Cerrado</option>
                        <option value="perdido">Perdido</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(lead.created_at).toLocaleDateString('es-CO')}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setSelectedLead(lead);
                          setEditData(lead);
                        }}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Detalle */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {editMode ? 'Editar Lead' : 'Detalles del Lead'}
                </h2>
                <p className="text-sm text-gray-500">Informe #{selectedLead.report_number}</p>
              </div>
              <div className="flex items-center gap-2">
                {editMode ? (
                  <>
                    <button
                      onClick={saveLeadChanges}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      <Save className="w-4 h-4" />
                      Guardar
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setEditData(selectedLead);
                      }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedLead(null);
                    setEditMode(false);
                  }}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6 space-y-6">
              {/* Información del Cliente */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                  {editMode ? (
                    <input
                      type="text"
                      value={editData.name || ''}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900">{selectedLead.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={editData.phone || ''}
                      onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <a 
                      href={`https://wa.me/${selectedLead.phone?.replace(/\D/g, '')}`}
                      target="_blank"
                      className="flex items-center gap-2 text-green-600 hover:text-green-700"
                    >
                      <Phone className="w-4 h-4" />
                      {selectedLead.phone}
                    </a>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sitio Web</label>
                  {editMode ? (
                    <input
                      type="url"
                      value={editData.website_url || ''}
                      onChange={(e) => setEditData({...editData, website_url: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <a 
                      href={selectedLead.website_url}
                      target="_blank"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {selectedLead.website_url}
                    </a>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                  {editMode ? (
                    <select
                      value={editData.status || 'nuevo'}
                      onChange={(e) => setEditData({...editData, status: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="nuevo">Nuevo</option>
                      <option value="contactado">Contactado</option>
                      <option value="interesado">Interesado</option>
                      <option value="negociando">Negociando</option>
                      <option value="cerrado">Cerrado</option>
                      <option value="perdido">Perdido</option>
                    </select>
                  ) : (
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedLead.status)}`}>
                      {getStatusIcon(selectedLead.status)}
                      {selectedLead.status}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha de Seguimiento</label>
                  {editMode ? (
                    <input
                      type="date"
                      value={editData.follow_up_date || ''}
                      onChange={(e) => setEditData({...editData, follow_up_date: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  ) : (
                    <p className="text-gray-900">
                      {selectedLead.follow_up_date 
                        ? new Date(selectedLead.follow_up_date).toLocaleDateString('es-CO')
                        : 'No programada'}
                    </p>
                  )}
                </div>
              </div>

              {/* Scores */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Puntuaciones Técnicas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Rendimiento</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedLead.performance_score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">SEO</p>
                    <p className="text-2xl font-bold text-green-600">{selectedLead.seo_score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Accesibilidad</p>
                    <p className="text-2xl font-bold text-purple-600">{selectedLead.accessibility_score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Intentos</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedLead.attempt_count || 1}</p>
                  </div>
                </div>
              </div>

              {/* Análisis */}
              {selectedLead.analysis_summary && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Resumen del Análisis</label>
                  <p className="text-gray-700 bg-gray-50 rounded-lg p-4">
                    {selectedLead.analysis_summary}
                  </p>
                </div>
              )}

              {/* Notas */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notas y Seguimiento</label>
                {editMode ? (
                  <textarea
                    value={editData.notes || ''}
                    onChange={(e) => setEditData({...editData, notes: e.target.value})}
                    rows={4}
                    placeholder="Agrega notas sobre este cliente..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="text-gray-700 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
                    {selectedLead.notes || 'Sin notas'}
                  </p>
                )}
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
                <div>
                  <span className="font-semibold">Fecha de Análisis:</span>
                  <p>{new Date(selectedLead.created_at).toLocaleString('es-CO')}</p>
                </div>
                <div>
                  <span className="font-semibold">IP:</span>
                  <p className="font-mono">{selectedLead.ip_address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}