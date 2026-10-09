export const business = {
  name: "Dany Mundo Rosa Beauty",
  booking: "https://online.maapp.com.br/danymundorosabeauty",
  instagram: "https://www.instagram.com/danymundorosabeauty/",
  whatsapp:
    "https://api.whatsapp.com/send/?phone=5513996005918&text=Ol%C3%A1%2C%20gostaria%20de%20marcar%20um%20hor%C3%A1rio",
  maps: "https://www.google.com/maps/search/?api=1&query=Rua%20Xavantes,%20564,%20Tupi,%20Praia%20Grande%20SP,%2011703-300",
  phone: "(13) 99600-5918",
  tel: "tel:+5513996005918",
  address: "Rua Xavantes, 564",
  locality: "Vila Tupi, Praia Grande • SP",
  postalCode: "11703-300",
} as const;

// Os horários do Maps e da agenda divergem. Não publicar até a validação.
export const schema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: business.name,
  telephone: "+55-13-99600-5918",
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address,
    addressLocality: "Praia Grande",
    addressRegion: "SP",
    postalCode: business.postalCode,
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -24.0196811,
    longitude: -46.4619681,
  },
  hasMap: business.maps,
  sameAs: [business.instagram, "https://maapp.com.br/danymundorosa"],
};
