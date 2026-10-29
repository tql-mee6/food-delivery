/* Ссылки и карта для адреса ресторана — без API-ключей */

/** Яндекс.Карты: маршрут от текущего местоположения пользователя до точки */
export function yandexRouteUrl(lat: number, lng: number): string {
  return `https://yandex.ru/maps/?rtext=~${lat},${lng}&rtt=auto`;
}

/** Google Maps: маршрут до точки (приложение само подставит старт пользователя) */
export function googleRouteUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

/** 2ГИС: карточка места — многим в России привычнее для поиска входа и парковки */
export function dvGisUrl(lat: number, lng: number): string {
  return `https://2gis.ru/geo/${lng},${lat}`;
}

/** Встраиваемая карта OpenStreetMap с меткой — без ключа и регистрации */
export function osmEmbedUrl(lat: number, lng: number, delta = 0.006): string {
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join(',');
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}
