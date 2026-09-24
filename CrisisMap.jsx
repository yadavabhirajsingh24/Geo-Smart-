import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';

// Fix Leaflet marker icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Heatmap Layer Component
const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !points.length) return;

    const heatData = points.map(p => [
      p.location.coordinates.lat,
      p.location.coordinates.lng,
      p.priorityScore / 500
    ]);

    const heatLayer = L.heatLayer(heatData, {
      radius: 35,
      blur: 25,
      maxZoom: 17,
      gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' }
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

const CrisisMap = ({ needs }) => {
  const center = [20.5937, 78.9629]; // Central point of India

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
      <MapContainer 
        center={center} 
        zoom={5} 
        style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; Esri'
        />
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; Labels'
        />
        
        <HeatmapLayer points={needs} />
        
        {needs.map((need) => (
          <React.Fragment key={need._id}>
            {/* Draw Routes for Assigned Volunteers */}
            {need.status === 'Assigned' && need.assignedVolunteers.map(vol => (
              <Polyline 
                key={vol._id}
                positions={[
                  [vol.location.coordinates.lat, vol.location.coordinates.lng],
                  [need.location.coordinates.lat, need.location.coordinates.lng]
                ]}
                pathOptions={{ 
                  color: '#f43f5e', 
                  weight: 3, 
                  dashArray: '10, 10',
                  opacity: 0.6
                }}
              />
            ))}

            <Marker position={[need.location.coordinates.lat, need.location.coordinates.lng]}>
              <Popup className="custom-popup">
                <div className="p-3 text-gray-800 min-w-[200px]">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">{need.category} Need</h3>
                    <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded ${
                      need.urgency >= 4 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {need.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{need.description}</p>
                  
                  {need.assignedVolunteers.length > 0 && (
                    <div className="mt-2 border-t pt-2">
                      <div className="text-[10px] uppercase text-gray-400 font-bold mb-1">Assigned Help:</div>
                      {need.assignedVolunteers.map(vol => (
                        <div key={vol._id} className="text-xs font-semibold flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          {vol.name} is en route
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
      
      <div className="absolute bottom-6 left-6 z-[1000] glass-card p-3 text-[10px] uppercase font-bold tracking-widest flex items-center gap-4">
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#f43f5e]" /> Critical</div>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#f43f5e]" /> Route</div>
      </div>
    </div>
  );
};

export default CrisisMap;
