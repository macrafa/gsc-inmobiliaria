export type Operation = 'sale' | 'rent' | 'vacation'
export type PropertyType = 'apartment' | 'house' | 'commercial' | 'land'
export type Currency = 'USD' | 'VES'

export type Property = {
  id: string
  slug: string
  title: string
  operation: Operation
  type: PropertyType
  price: number
  currency: Currency
  city: string
  state: string
  area_m2?: number
  bedrooms?: number
  bathrooms?: number
  shortDescription?: string
  description: string
  coverImage: string
  images: string[]
  whatsappPhone: string
  soldAt?: string // ISO date if recently sold
  tag?: string // Etiquetas visuales: "Nuevo" | "Destacado" | "Oferta"
}

export const properties: Property[] = [
  {
    id: 'prop-001',
    slug: 'apto-porlamar-centro-65m2',
    title: 'Apartamento en Porlamar Centro • 65 m²',
    operation: 'sale',
    type: 'apartment',
    price: 25000,
    currency: 'USD',
    city: 'Porlamar',
    state: 'Nueva Esparta',
    tag: 'Nuevo',
    area_m2: 65,
    bedrooms: 2,
    bathrooms: 2,
    shortDescription: 'Cerca de Av. 4 de Mayo, piso medio.',
    description: 'Apartamento luminoso, cocina integrada y balcón. Edificio con ascensor.',
    coverImage: 'https://scontent.fbel7-2.fna.fbcdn.net/v/t39.30808-6/498338804_1253745386755105_3777819821035620631_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHJDjRcaKqRoOSIfAhRCeTH__wOOag8Tuv__A45qDxO654FFAq4BYl_wbZiHkcAQhg&_nc_ohc=U_N4Lw8YnT8Q7kNvwELaOf6&_nc_oc=AdnxWOueY2Duv3UXx8CO13coazoY4hiD54JJNh9-W6mdpIw2WOpF9nB_g9oDSDUkXiKhFlmxG4yN-7RG9HJ9GzbH&_nc_zt=23&_nc_ht=scontent.fbel7-2.fna&_nc_gid=ih9uc8DLdgjQGmf7QUFE_Q&oh=00_AfbPpp7PBtAPKjuF1sVEpzR70lFTTZ4V_j3IKgH3iQtMaA&oe=68CD0FA4',
    images: [
      'https://scontent.fbel7-2.fna.fbcdn.net/v/t39.30808-6/498338804_1253745386755105_3777819821035620631_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHJDjRcaKqRoOSIfAhRCeTH__wOOag8Tuv__A45qDxO654FFAq4BYl_wbZiHkcAQhg&_nc_ohc=U_N4Lw8YnT8Q7kNvwELaOf6&_nc_oc=AdnxWOueY2Duv3UXx8CO13coazoY4hiD54JJNh9-W6mdpIw2WOpF9nB_g9oDSDUkXiKhFlmxG4yN-7RG9HJ9GzbH&_nc_zt=23&_nc_ht=scontent.fbel7-2.fna&_nc_gid=ih9uc8DLdgjQGmf7QUFE_Q&oh=00_AfbPpp7PBtAPKjuF1sVEpzR70lFTTZ4V_j3IKgH3iQtMaA&oe=68CD0FA4',
      'https://scontent.fbel7-1.fna.fbcdn.net/v/t39.30808-6/497915176_1253745393421771_5244234440240036008_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEEfUKGRgPSQ-Vij2N3vdKlpPHzAb-hF0Gk8fMBv6EXQflQi2RTHwzAhiUNCRXZZ2s&_nc_ohc=eKCSS2RWJT0Q7kNvwFnpo84&_nc_oc=AdlwXMZ_f9Ep_N5yxinysSuNzpvwAc0BZgO7A5VQYumuMC6Zs1Bej5R4ZOu9PRI9DNpFAQQDrlYKeilZtLMFDkJd&_nc_zt=23&_nc_ht=scontent.fbel7-1.fna&_nc_gid=ih9uc8DLdgjQGmf7QUFE_Q&oh=00_AfbEvd2IMKxalWWsAJBeoC6Yy-UNHDLScLdG_BubeCQP3Q&oe=68CCE832'
    ],
    whatsappPhone: '+58XXXXXXXXXX'
  },
  {
    id: 'prop-002',
    slug: 'casa-pampatar-3h-2b-120m2',
    title: 'Casa en Pampatar • 120 m²',
    operation: 'rent',
    type: 'house',
    price: 500,
    currency: 'USD',
    city: 'Pampatar',
    state: 'Nueva Esparta',
    tag: 'Destacado',
    bedrooms: 3,
    bathrooms: 2,
    description: 'Casa cómoda con patio y estacionamiento para 2 vehículos.',
    coverImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1600&auto=format&fit=crop'
    ],
    whatsappPhone: '+58XXXXXXXXXX'
  },
  {
    id: 'prop-003',
    slug: 'apto-pampatar-la-caranta-2h-2b-95m2',
    title: 'Apto en Pampatar – La Caranta • 95 m²',
    operation: 'sale',
    type: 'apartment',
    price: 165000,
    currency: 'USD',
    city: 'Pampatar',
    state: 'Nueva Esparta',
    tag: 'Destacado',
    bedrooms: 2,
    bathrooms: 2,
    area_m2: 95,
    shortDescription: 'Vista al mar, cocina equipada y acceso a restaurantes.',
    description: 'Apartamento con vista al mar, cocina equipada y excelente ubicación en La Caranta.',
    coverImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4ce9940c70b5?q=80&w=1600&auto=format&fit=crop'
    ],
    whatsappPhone: '+58XXXXXXXXXX',
    soldAt: '2025-09-02'
  },
  {
    id: 'prop-004',
    slug: 'townhouse-villas-del-sol-3h-3b-140m2',
    title: 'Townhouse – Villas del Sol • 140 m²',
    operation: 'sale',
    type: 'house',
    price: 85000,
    currency: 'USD',
    city: 'Playa El Agua',
    state: 'Nueva Esparta',
    tag: 'Oferta',
    bedrooms: 3,
    bathrooms: 3,
    area_m2: 140,
    shortDescription: 'Conjunto cerrado a 5 min de la playa. Terraza y parrillera.',
    description: 'Townhouse en conjunto cerrado, a 5 minutos de la playa. Terraza privada con parrillera.',
    coverImage: 'https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=1800&auto=format&fit=crop'
    ],
    whatsappPhone: '+58XXXXXXXXXX'
  },
  {
    id: 'prop-005',
    slug: 'casa-la-asuncion-4h-4b-320m2',
    title: 'Casa quinta en La Asunción • 320 m²',
    operation: 'sale',
    type: 'house',
    price: 220000,
    currency: 'USD',
    city: 'La Asunción',
    state: 'Nueva Esparta',
    tag: 'Destacado',
    bedrooms: 4,
    bathrooms: 4,
    area_m2: 320,
    shortDescription: 'Amplios jardines y estudio. Calle cerrada, clima fresco.',
    description: 'Casa con amplios jardines y estudio. Calle cerrada, clima fresco.',
    coverImage: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop'
    ],
    whatsappPhone: '+58XXXXXXXXXX'
  },
  {
    id: 'prop-006',
    slug: 'ph-costa-mar-4h-4b-220m2',
    title: 'PH Costa Mar – Porlamar • 220 m²',
    operation: 'sale',
    type: 'apartment',
    price: 190000,
    currency: 'USD',
    city: 'Porlamar',
    state: 'Nueva Esparta',
    tag: 'Nuevo',
    bedrooms: 4,
    bathrooms: 4,
    area_m2: 220,
    shortDescription: 'Dúplex con terraza y cocina integrada. Pozo y gimnasio.',
    description: 'Penthouse dúplex con terraza y cocina integrada. Edificio con pozo y gimnasio.',
    coverImage: 'https://images.unsplash.com/photo-1600607687920-4ce9940c70b5?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4ce9940c70b5?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=1600&auto=format&fit=crop'
    ],
    whatsappPhone: '+58XXXXXXXXXX'
  },
  {
    id: 'prop-007',
    slug: 'apto-costa-azul-2h-2b-78m2',
    title: 'Apartamento en Costa Azul • 78 m²',
    operation: 'sale',
    type: 'apartment',
    price: 76000,
    currency: 'USD',
    city: 'Costa Azul',
    state: 'Nueva Esparta',
    tag: 'Nuevo',
    bedrooms: 2,
    bathrooms: 2,
    area_m2: 78,
    shortDescription: 'Cerca del C.C. La Vela. Piscina y vigilancia.',
    description: 'Apartamento moderno con cocina integrada, piscina y vigilancia 24/7 en Costa Azul.',
    coverImage: 'https://scontent.fbel7-1.fna.fbcdn.net/v/t39.30808-6/490134660_1220650070064637_1764076617654375416_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEkMI1rlJVp0-0Npi8f5ttPvAGVd05aEE28AZV3TloQTUSGs8fsgA3fuvzReae1sak&_nc_ohc=pGV34dRMWqMQ7kNvwFVchdx&_nc_oc=Adn6EbPgZ5sq8a2-sA8QC1ocjJ2EgIX2MFrm5UK0GHzE0rRXUgREkGujl61-aik1NohnqA5nJpygvk2dJobswOwI&_nc_zt=23&_nc_ht=scontent.fbel7-1.fna&_nc_gid=ldSkswZ1wpJHYqdHdjzH6w&oh=00_AfZlFDWxc7QTEAvON-gKhhJE9dsNomr-VRl67WnmosyBOw&oe=68CCFBED',
    images: [
      'https://scontent.fbel7-1.fna.fbcdn.net/v/t39.30808-6/490134660_1220650070064637_1764076617654375416_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEkMI1rlJVp0-0Npi8f5ttPvAGVd05aEE28AZV3TloQTUSGs8fsgA3fuvzReae1sak&_nc_ohc=pGV34dRMWqMQ7kNvwFVchdx&_nc_oc=Adn6EbPgZ5sq8a2-sA8QC1ocjJ2EgIX2MFrm5UK0GHzE0rRXUgREkGujl61-aik1NohnqA5nJpygvk2dJobswOwI&_nc_zt=23&_nc_ht=scontent.fbel7-1.fna&_nc_gid=ldSkswZ1wpJHYqdHdjzH6w&oh=00_AfZlFDWxc7QTEAvON-gKhhJE9dsNomr-VRl67WnmosyBOw&oe=68CCFBED',
      'https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?q=80&w=1600&auto=format&fit=crop'
    ],
    whatsappPhone: '+58XXXXXXXXXX'
  },
  {
    id: 'prop-008',
    slug: 'casa-juangriego-3h-3b-180m2',
    title: 'Casa en Juan Griego • 180 m²',
    operation: 'sale',
    type: 'house',
    price: 125000,
    currency: 'USD',
    city: 'Juan Griego',
    state: 'Nueva Esparta',
    tag: 'Destacado',
    bedrooms: 3,
    bathrooms: 3,
    area_m2: 180,
    shortDescription: 'Jardín, porche y estacionamiento para 3 vehículos.',
    description: 'Casa amplia con jardín, porche techado y espacios luminosos a pocos minutos de la bahía.',
    coverImage: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1600&auto=format&fit=crop'
    ],
    whatsappPhone: '+58XXXXXXXXXX'
  },
  {
    id: 'prop-009',
    slug: 'local-avenida-4-de-mayo-85m2',
    title: 'Local comercial — Av. 4 de Mayo • 85 m²',
    operation: 'rent',
    type: 'commercial',
    price: 900,
    currency: 'USD',
    city: 'Porlamar',
    state: 'Nueva Esparta',
    tag: 'Oferta',
    area_m2: 85,
    shortDescription: 'Alto flujo peatonal y vitrinas amplias.',
    description: 'Local con excelente exposición sobre la Av. 4 de Mayo. Ideal para retail y servicios.',
    coverImage: 'https://scontent.fbel7-1.fna.fbcdn.net/v/t39.30808-6/491684477_1226593409470303_1075292745842611886_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFVE2cngC0LFzAHs07Hy4xODovKjp9YDAMOi8qOn1gMAxOIoKFWaT6HdN4Xwep65zg&_nc_ohc=nmckTvkdYcsQ7kNvwETO3OP&_nc_oc=Adk64r59bMwvI2J1_-G5IWBAje0N9aeZM9uWqp9nfHcVxLB1TVZP-44KWasd_wdKJ_zAbnfKEjD7tYxoHoH5NH_m&_nc_zt=23&_nc_ht=scontent.fbel7-1.fna&_nc_gid=7ACMIfAD-Kv0Dc9KpKqVQg&oh=00_AfYrE9dgiMp3GDDN6MZwJN1TBC6PsC2vTtHtGY08XFFgnQ&oe=68CCEB14',
    images: [
      'https://scontent.fbel7-1.fna.fbcdn.net/v/t39.30808-6/491684477_1226593409470303_1075292745842611886_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFVE2cngC0LFzAHs07Hy4xODovKjp9YDAMOi8qOn1gMAxOIoKFWaT6HdN4Xwep65zg&_nc_ohc=nmckTvkdYcsQ7kNvwETO3OP&_nc_oc=Adk64r59bMwvI2J1_-G5IWBAje0N9aeZM9uWqp9nfHcVxLB1TVZP-44KWasd_wdKJ_zAbnfKEjD7tYxoHoH5NH_m&_nc_zt=23&_nc_ht=scontent.fbel7-1.fna&_nc_gid=7ACMIfAD-Kv0Dc9KpKqVQg&oh=00_AfYrE9dgiMp3GDDN6MZwJN1TBC6PsC2vTtHtGY08XFFgnQ&oe=68CCEB14',
      'https://scontent.fbel7-1.fna.fbcdn.net/v/t39.30808-6/491801308_1226593396136971_6548719090720580740_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFma_ASq17YpxLkrLuKr4-OdoQ9rfLMNCp2hD2t8sw0KiPEVortvpCrHCw9l3Isn_c&_nc_ohc=emBHBIp3E1sQ7kNvwFNr5vo&_nc_oc=AdnpIBY1nao9-mP9fI8Adh6C7Mj55YVT6eeRqAqStsnO1b0b7aYfYouQZjK-CvX97L1QiWA7u04lXghD7VpqHGut&_nc_zt=23&_nc_ht=scontent.fbel7-1.fna&_nc_gid=dXcWqbZs5_DhuL7rE-okUw&oh=00_AfZesTW61BUEkwIR5YlpIg9wM_AvD90tAZWxpSAImZGmLQ&oe=68CCF9A0'
    ],
    whatsappPhone: '+58XXXXXXXXXX'
  },
  {
    id: 'prop-010',
    slug: 'terreno-la-asuncion-520m2',
    title: 'Terreno en La Asunción • 520 m²',
    operation: 'sale',
    type: 'land',
    price: 38000,
    currency: 'USD',
    city: 'La Asunción',
    state: 'Nueva Esparta',
    shortDescription: 'Zona residencial tranquila. Documentos al día.',
    description: 'Parcela plana con acceso a servicios. Ideal para vivienda unifamiliar en zona fresca.',
    coverImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop'
    ],
    whatsappPhone: '+58XXXXXXXXXX'
  },
  {
    id: 'prop-011',
    slug: 'apto-playa-el-agua-1h-1b-54m2',
    title: 'Apto en Playa El Agua • 54 m²',
    operation: 'vacation',
    type: 'apartment',
    price: 75,
    currency: 'USD',
    city: 'Playa El Agua',
    state: 'Nueva Esparta',
    tag: 'Nuevo',
    bedrooms: 1,
    bathrooms: 1,
    area_m2: 54,
    shortDescription: 'A 2 cuadras de la playa. Amoblado.',
    description: 'Apartamento vacacional amoblado a pocas cuadras de Playa El Agua. Aire acondicionado y wifi.',
    coverImage: 'https://scontent.fbel7-2.fna.fbcdn.net/v/t39.30808-6/487310661_1208347184628259_5612530753801750541_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEKKJKWTSci2GpZZDcDQTsDtZINqWiASRW1kg2paIBJFe3MVSCz6M30LOFPdWH3oyM&_nc_ohc=pCtmmJCw5mUQ7kNvwH61gA3&_nc_oc=AdnK_-WpUoVWEOs1n3dGbYV8ObKlcnw4PMgDy6aKiMAy4mqoCNQx6EcoMZYc8sgtteG8Lj3XSGapDKr3Yow7WvFd&_nc_zt=23&_nc_ht=scontent.fbel7-2.fna&_nc_gid=HZPg3IzMK-aDrfPlewOPyw&oh=00_AfaEmR_dR_ZVk9-h6lUqPllvq0O1txkvE-E5Tvg4Cr3N5w&oe=68CCE94B',
    images: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1600&auto=format&fit=crop'
    ],
    whatsappPhone: '+58XXXXXXXXXX'
  },
  {
    id: 'prop-012',
    slug: 'casa-los-robles-3h-3b-210m2',
    title: 'Casa en Los Robles • 210 m²',
    operation: 'sale',
    type: 'house',
    price: 145000,
    currency: 'USD',
    city: 'Los Robles',
    state: 'Nueva Esparta',
    tag: 'Destacado',
    bedrooms: 3,
    bathrooms: 3,
    area_m2: 210,
    shortDescription: 'Calle cerrada, patio y parrillera.',
    description: 'Casa lista para mudarse en Los Robles. Espacios sociales amplios, patio y parrillera.',
    coverImage: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1600&auto=format&fit=crop'
    ],
    whatsappPhone: '+58XXXXXXXXXX'
  }
]
