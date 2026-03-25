export interface Estate {
  name: string;
}

export interface SubCounty {
  name: string;
  estates?: Estate[];
}

export interface County {
  name: string;
  subCounties: SubCounty[];
}

export const kenyaLocations: County[] = [
  {
    name: "Nairobi",
    subCounties: [
      {
        name: "Westlands",
        estates: [
          { name: "Parklands" },
          { name: "Highridge" },
          { name: "Kangemi" },
          { name: "Mountain View" },
          { name: "Kitisuru" },
          { name: "Karura" },
          { name: "Runda" },
          { name: "Muthaiga" },
        ],
      },
      {
        name: "Dagoretti North",
        estates: [
          { name: "Kawangware" },
          { name: "Gatina" },
          { name: "Kileleshwa" },
          { name: "Kilimani" },
        ],
      },
      {
        name: "Dagoretti South",
        estates: [
          { name: "Mutuini" },
          { name: "Ngando" },
          { name: "Riruta" },
          { name: "Uthiru" },
        ],
      },
      {
        name: "Langata",
        estates: [
          { name: "Karen" },
          { name: "Nairobi West" },
          { name: "Mugumoini" },
          { name: "South C" },
          { name: "Nyayo Highrise" },
        ],
      },
      {
        name: "Kibra",
        estates: [
          { name: "Kibera" },
          { name: "Laini Saba" },
          { name: "Lindi" },
          { name: "Makina" },
          { name: "Woodley" },
        ],
      },
      {
        name: "Roysambu",
        estates: [
          { name: "Roysambu" },
          { name: "Kahawa West" },
          { name: "Zimmerman" },
          { name: "Garden Estate" },
          { name: "Thome" },
        ],
      },
      {
        name: "Kasarani",
        estates: [
          { name: "Kasarani" },
          { name: "Mwiki" },
          { name: "Claycity" },
          { name: "Githurai" },
          { name: "Kahawa" },
          { name: "Sunton" },
        ],
      },
      {
        name: "Ruaraka",
        estates: [
          { name: "Baba Dogo" },
          { name: "Utalii" },
          { name: "Mathare North" },
          { name: "Lucky Summer" },
        ],
      },
      {
        name: "Embakasi South",
        estates: [
          { name: "Imara Daima" },
          { name: "Kwa Njenga" },
          { name: "Kwa Reuben" },
          { name: "Pipeline" },
        ],
      },
      {
        name: "Embakasi North",
        estates: [
          { name: "Kariobangi North" },
          { name: "Dandora" },
          { name: "Korogocho" },
        ],
      },
      {
        name: "Embakasi Central",
        estates: [
          { name: "Kayole" },
          { name: "Komarock" },
          { name: "Matopeni" },
          { name: "Njiru" },
        ],
      },
      {
        name: "Embakasi East",
        estates: [
          { name: "Mihango" },
          { name: "Utawala" },
          { name: "Embakasi" },
        ],
      },
      {
        name: "Embakasi West",
        estates: [
          { name: "Umoja" },
          { name: "Mowlem" },
          { name: "Kariobangi South" },
        ],
      },
      {
        name: "Makadara",
        estates: [
          { name: "Makadara" },
          { name: "Maringo" },
          { name: "Viwandani" },
          { name: "Harambee" },
        ],
      },
      {
        name: "Kamukunji",
        estates: [
          { name: "Pumwani" },
          { name: "Eastleigh North" },
          { name: "Eastleigh South" },
          { name: "Airbase" },
        ],
      },
      {
        name: "Starehe",
        estates: [
          { name: "Nairobi Central" },
          { name: "Ngara" },
          { name: "Pangani" },
          { name: "Ziwani" },
          { name: "Landimawe" },
        ],
      },
      {
        name: "Mathare",
        estates: [
          { name: "Mathare" },
          { name: "Hospital" },
          { name: "Mabatini" },
          { name: "Huruma" },
        ],
      },
    ],
  },
  {
    name: "Mombasa",
    subCounties: [
      {
        name: "Mvita",
        estates: [
          { name: "Mombasa CBD" },
          { name: "Old Town" },
          { name: "Shimanzi" },
          { name: "Majengo" },
        ],
      },
      {
        name: "Changamwe",
        estates: [
          { name: "Port Reitz" },
          { name: "Kipevu" },
          { name: "Airport" },
          { name: "Chaani" },
        ],
      },
      {
        name: "Jomvu",
        estates: [
          { name: "Jomvu Kuu" },
          { name: "Miritini" },
          { name: "Mikindani" },
        ],
      },
      {
        name: "Kisauni",
        estates: [
          { name: "Bamburi" },
          { name: "Mwakirunge" },
          { name: "Mtopanga" },
          { name: "Shanzu" },
          { name: "Nyali" },
        ],
      },
      {
        name: "Nyali",
        estates: [
          { name: "Nyali" },
          { name: "Frere Town" },
          { name: "Ziwa La Ng'ombe" },
        ],
      },
      {
        name: "Likoni",
        estates: [
          { name: "Likoni" },
          { name: "Shika Adabu" },
          { name: "Bofu" },
          { name: "Mtongwe" },
        ],
      },
    ],
  },
  {
    name: "Kisumu",
    subCounties: [
      {
        name: "Kisumu Central",
        estates: [
          { name: "Kisumu CBD" },
          { name: "Kondele" },
          { name: "Nyalenda" },
        ],
      },
      {
        name: "Kisumu East",
        estates: [
          { name: "Kajulu" },
          { name: "Kolwa East" },
          { name: "Manyatta B" },
        ],
      },
      {
        name: "Kisumu West",
        estates: [
          { name: "North West Kisumu" },
          { name: "Central Kisumu" },
          { name: "South West Kisumu" },
        ],
      },
      {
        name: "Seme",
        estates: [
          { name: "West Seme" },
          { name: "Central Seme" },
          { name: "East Seme" },
        ],
      },
      {
        name: "Nyando",
        estates: [
          { name: "Lower Nyakach" },
          { name: "Upper Nyakach" },
          { name: "Awasi" },
        ],
      },
      {
        name: "Muhoroni",
        estates: [
          { name: "Muhoroni" },
          { name: "Chemelil" },
          { name: "Miwani" },
        ],
      },
      {
        name: "Nyakach",
        estates: [
          { name: "South West Nyakach" },
          { name: "North Nyakach" },
          { name: "Central Nyakach" },
        ],
      },
    ],
  },
  {
    name: "Kiambu",
    subCounties: [
      {
        name: "Kiambu Town",
        estates: [
          { name: "Kiambu Town" },
          { name: "Ndumberi" },
          { name: "Riabai" },
        ],
      },
      {
        name: "Thika Town",
        estates: [
          { name: "Thika Town" },
          { name: "Hospital" },
          { name: "Gatuanyaga" },
          { name: "Kamenu" },
        ],
      },
      {
        name: "Ruiru",
        estates: [
          { name: "Ruiru Town" },
          { name: "Biashara" },
          { name: "Gatongora" },
          { name: "Kahawa Sukari" },
          { name: "Membley" },
        ],
      },
      {
        name: "Juja",
        estates: [
          { name: "Juja Town" },
          { name: "Kalimoni" },
          { name: "Witeithie" },
          { name: "Theta" },
        ],
      },
      {
        name: "Kikuyu",
        estates: [
          { name: "Kikuyu Town" },
          { name: "Kinoo" },
          { name: "Karai" },
        ],
      },
      {
        name: "Limuru",
        estates: [
          { name: "Limuru Town" },
          { name: "Ndeiya" },
          { name: "Tigoni" },
        ],
      },
      {
        name: "Githunguri",
        estates: [
          { name: "Githunguri Town" },
          { name: "Githiga" },
          { name: "Ikinu" },
        ],
      },
      {
        name: "Gatundu South",
        estates: [
          { name: "Kiamwangi" },
          { name: "Kiganjo" },
          { name: "Ndarugu" },
        ],
      },
      {
        name: "Gatundu North",
        estates: [
          { name: "Gituamba" },
          { name: "Githobokoni" },
          { name: "Chania" },
        ],
      },
      {
        name: "Lari",
        estates: [
          { name: "Lari" },
          { name: "Kijabe" },
          { name: "Kamburu" },
        ],
      },
      {
        name: "Kabete",
        estates: [
          { name: "Kabete" },
          { name: "Uthiru" },
          { name: "Muguga" },
        ],
      },
      {
        name: "Kiambaa",
        estates: [
          { name: "Karuri" },
          { name: "Ndenderu" },
          { name: "Muchatha" },
        ],
      },
    ],
  },
  {
    name: "Nakuru",
    subCounties: [
      {
        name: "Nakuru Town East",
        estates: [
          { name: "Nakuru East" },
          { name: "Biashara" },
          { name: "Flamingo" },
        ],
      },
      {
        name: "Nakuru Town West",
        estates: [
          { name: "Nakuru West" },
          { name: "Kaptembwo" },
          { name: "Kapkures" },
        ],
      },
      {
        name: "Naivasha",
        estates: [
          { name: "Naivasha Town" },
          { name: "Viwandani" },
          { name: "Hells Gate" },
        ],
      },
      {
        name: "Gilgil",
        estates: [
          { name: "Gilgil Town" },
          { name: "Elementaita" },
          { name: "Malewa West" },
        ],
      },
      {
        name: "Molo",
        estates: [
          { name: "Molo Town" },
          { name: "Mariashoni" },
          { name: "Elburgon" },
        ],
      },
      {
        name: "Njoro",
        estates: [
          { name: "Njoro Town" },
          { name: "Mauche" },
          { name: "Kihingo" },
        ],
      },
      {
        name: "Rongai",
        estates: [
          { name: "Rongai Town" },
          { name: "Soin" },
          { name: "Menengai West" },
        ],
      },
      {
        name: "Subukia",
        estates: [
          { name: "Subukia Town" },
          { name: "Waseges" },
          { name: "Kabazi" },
        ],
      },
      {
        name: "Kuresoi South",
        estates: [
          { name: "Keringet" },
          { name: "Kiptagich" },
          { name: "Tinet" },
        ],
      },
      {
        name: "Kuresoi North",
        estates: [
          { name: "Kuresoi" },
          { name: "Sinendet" },
          { name: "Nyota" },
        ],
      },
      {
        name: "Bahati",
        estates: [
          { name: "Bahati Town" },
          { name: "Lanet" },
          { name: "Dundori" },
        ],
      },
    ],
  },
  {
    name: "Machakos",
    subCounties: [
      { name: "Machakos Town", estates: [{ name: "Machakos Town" }, { name: "Mumbuni" }] },
      { name: "Mavoko", estates: [{ name: "Athi River" }, { name: "Syokimau" }, { name: "Mlolongo" }] },
      { name: "Kathiani", estates: [{ name: "Kathiani" }, { name: "Mitaboni" }] },
      { name: "Kangundo", estates: [{ name: "Kangundo" }, { name: "Tala" }] },
      { name: "Matungulu", estates: [{ name: "Matungulu" }, { name: "Kyeleni" }] },
      { name: "Yatta", estates: [{ name: "Yatta" }, { name: "Matuu" }] },
      { name: "Mwala", estates: [{ name: "Mwala" }, { name: "Wamunyu" }] },
      { name: "Masinga", estates: [{ name: "Masinga" }, { name: "Ekalakala" }] },
    ],
  },
  {
    name: "Kajiado",
    subCounties: [
      { name: "Kajiado Central", estates: [{ name: "Kajiado Town" }, { name: "Ongata Rongai" }, { name: "Ngong" }] },
      { name: "Kajiado North", estates: [{ name: "Kitengela" }, { name: "Kiserian" }] },
      { name: "Kajiado East", estates: [{ name: "Isinya" }, { name: "Kitengela East" }] },
      { name: "Kajiado West", estates: [{ name: "Magadi" }, { name: "Iloodokilani" }] },
      { name: "Loitokitok", estates: [{ name: "Loitokitok" }, { name: "Kimana" }] },
    ],
  },
  {
    name: "Uasin Gishu",
    subCounties: [
      { name: "Eldoret East", estates: [{ name: "Eldoret East" }, { name: "Langas" }] },
      { name: "Eldoret West", estates: [{ name: "Eldoret West" }, { name: "Pioneer" }] },
      { name: "Kapseret", estates: [{ name: "Kapseret" }, { name: "Simat" }] },
      { name: "Kesses", estates: [{ name: "Kesses" }, { name: "Cheptiret" }] },
      { name: "Moiben", estates: [{ name: "Moiben" }, { name: "Tembelio" }] },
      { name: "Turbo", estates: [{ name: "Turbo" }, { name: "Ngenyilel" }] },
    ],
  },
];
