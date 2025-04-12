interface Location {
    latitude: number;
    longitude: number;
}

const USER_LOCATION: Location = {
    latitude: 10.4806,
    longitude: -66.9036
};

function calculateDistance(loc1: Location, loc2: Location): number {
    const R = 6371;
    const dLat = toRad(loc2.latitude - loc1.latitude);
    const dLon = toRad(loc2.longitude - loc1.longitude);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(toRad(loc1.latitude)) * Math.cos(toRad(loc2.latitude)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

function toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function generateRandomLocation(radiusKm: number = 5): Location {
    const r = radiusKm / 111.32;
    const u = Math.random();
    const v = Math.random();
    const w = r * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);
    
    return {
        latitude: USER_LOCATION.latitude + y,
        longitude: USER_LOCATION.longitude + x / Math.cos(USER_LOCATION.latitude)
    };
}

export function getStoreDistance(storeLocation: Location): number {
    return calculateDistance(USER_LOCATION, storeLocation);
}

export function getDistanceCategory(distance: number): string {
    if (distance < 1) return 'Muy cerca';
    if (distance < 3) return 'Cerca';
    if (distance < 5) return 'Mediana distancia';
    return 'Lejos';
} 