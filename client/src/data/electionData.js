import indianCities from './indianCities.json';

const curatedStates = [
  {
    state: 'Delhi', type: 'UT', lsSeats: 7, vsSeats: 70, ceo: 'CEO Delhi', ceoWebsite: 'https://ceodelhi.gov.in', helpline: '1950',
    districts: ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'South Delhi', 'West Delhi', 'North East Delhi', 'North West Delhi', 'Shahdara', 'South East Delhi', 'South West Delhi'],
    cities: ['New Delhi', 'Dwarka', 'Rohini', 'Saket', 'Karol Bagh', 'Lajpat Nagar', 'Janakpuri'],
    booths: [
      { id: 'PS-01', name: 'Govt. Boys Sr. Sec. School', address: 'Rajendra Nagar, New Delhi - 110060', constituency: 'New Delhi' },
      { id: 'PS-14', name: 'MCD Primary School', address: 'Karol Bagh, Central Delhi - 110005', constituency: 'Chandni Chowk' },
      { id: 'PS-28', name: 'Sarvodaya Vidyalaya', address: 'Dwarka Sector 6, South West Delhi - 110075', constituency: 'West Delhi' },
      { id: 'PS-42', name: 'Govt. Co-ed Sr. Sec. School', address: 'Rohini Sector 16, North West Delhi - 110089', constituency: 'North West Delhi' },
      { id: 'PS-55', name: 'MCD Primary School', address: 'Saket, South Delhi - 110017', constituency: 'South Delhi' },
      { id: 'PS-67', name: 'Govt. Girls Sr. Sec. School', address: 'Lajpat Nagar, South East Delhi - 110024', constituency: 'South Delhi' },
    ],
  },
  {
    state: 'Uttar Pradesh', type: 'State', lsSeats: 80, vsSeats: 403, ceo: 'CEO Uttar Pradesh', ceoWebsite: 'https://ceouttarpradesh.nic.in', helpline: '1950',
    districts: ['Lucknow', 'Agra', 'Varanasi', 'Kanpur', 'Prayagraj', 'Meerut', 'Ghaziabad', 'Noida', 'Moradabad', 'Bareilly', 'Gorakhpur', 'Aligarh', 'Mathura', 'Jhansi', 'Ayodhya', 'Amroha'],
    cities: ['Lucknow', 'Agra', 'Varanasi', 'Kanpur', 'Noida', 'Ghaziabad', 'Meerut', 'Prayagraj', 'Gorakhpur', 'Bareilly', 'Moradabad', 'Aligarh', 'Ayodhya', 'Gajraula'],
    booths: [
      { id: 'PS-101', name: 'Primary School, Hazratganj', address: 'Hazratganj, Lucknow - 226001', constituency: 'Lucknow Central' },
      { id: 'PS-112', name: 'Govt. Inter College', address: 'Aminabad, Lucknow - 226018', constituency: 'Lucknow West' },
      { id: 'PS-203', name: 'Agra Public School', address: 'Civil Lines, Agra - 282002', constituency: 'Agra Cantt' },
      { id: 'PS-305', name: 'BHU Campus School', address: 'Lanka, Varanasi - 221005', constituency: 'Varanasi South' },
      { id: 'PS-410', name: 'Govt. Primary School', address: 'Sector 62, Noida - 201301', constituency: 'Noida' },
    ],
  },
  {
    state: 'Maharashtra', type: 'State', lsSeats: 48, vsSeats: 288, ceo: 'CEO Maharashtra', ceoWebsite: 'https://ceo.maharashtra.gov.in', helpline: '1950',
    districts: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Kolhapur', 'Solapur'],
    cities: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Navi Mumbai'],
    booths: [
      { id: 'PS-001', name: 'BMC School, Dadar', address: 'Dadar West, Mumbai - 400028', constituency: 'Mumbai South Central' },
      { id: 'PS-015', name: 'Municipal School, Andheri', address: 'Andheri West, Mumbai - 400058', constituency: 'Mumbai North West' },
      { id: 'PS-032', name: 'Govt. School, Bandra', address: 'Bandra East, Mumbai - 400051', constituency: 'Mumbai North Central' },
      { id: 'PS-101', name: 'PMC Primary School', address: 'Shivajinagar, Pune - 411005', constituency: 'Pune' },
      { id: 'PS-112', name: 'ZP School, Hadapsar', address: 'Hadapsar, Pune - 411028', constituency: 'Pune Cantonment' },
      { id: 'PS-201', name: 'Nagpur Municipal School', address: 'Sitabuldi, Nagpur - 440012', constituency: 'Nagpur Central' },
    ],
  },
  {
    state: 'Karnataka', type: 'State', lsSeats: 28, vsSeats: 224, ceo: 'CEO Karnataka', ceoWebsite: 'https://ceokarnataka.kar.nic.in', helpline: '1950',
    districts: ['Bengaluru', 'Mysuru', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Shimoga'],
    cities: ['Bengaluru', 'Mysuru', 'Hubli-Dharwad', 'Mangalore', 'Belgaum'],
    booths: [
      { id: 'PS-01', name: 'BBMP Primary School', address: 'Jayanagar 4th Block, Bengaluru - 560011', constituency: 'Jayanagar' },
      { id: 'PS-18', name: 'Govt. School, Koramangala', address: 'Koramangala, Bengaluru - 560034', constituency: 'BTM Layout' },
      { id: 'PS-25', name: 'Govt. Higher Primary School', address: 'Indiranagar, Bengaluru - 560038', constituency: 'Shantinagar' },
      { id: 'PS-101', name: 'ZP School, Mysuru', address: 'Nazarbad, Mysuru - 570010', constituency: 'Chamaraja' },
    ],
  },
  {
    state: 'Tamil Nadu', type: 'State', lsSeats: 39, vsSeats: 234, ceo: 'CEO Tamil Nadu', ceoWebsite: 'https://ceotamilnadu.nic.in', helpline: '1950',
    districts: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode'],
    cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
    booths: [
      { id: 'PS-01', name: 'Corporation Primary School', address: 'T. Nagar, Chennai - 600017', constituency: 'Mylapore' },
      { id: 'PS-12', name: 'Govt. School, Adyar', address: 'Adyar, Chennai - 600020', constituency: 'Velachery' },
      { id: 'PS-30', name: 'Municipal School', address: 'Anna Nagar, Chennai - 600040', constituency: 'Virugambakkam' },
      { id: 'PS-101', name: 'Govt. High School', address: 'RS Puram, Coimbatore - 641002', constituency: 'Coimbatore South' },
    ],
  },
  {
    state: 'West Bengal', type: 'State', lsSeats: 42, vsSeats: 294, ceo: 'CEO West Bengal', ceoWebsite: 'https://ceowestbengal.nic.in', helpline: '1950',
    districts: ['Kolkata', 'Howrah', 'Darjeeling', 'Siliguri', 'Asansol', 'Durgapur', 'Murshidabad'],
    cities: ['Kolkata', 'Howrah', 'Siliguri', 'Asansol', 'Durgapur'],
    booths: [
      { id: 'PS-01', name: 'KMC Primary School', address: 'Park Street, Kolkata - 700016', constituency: 'Kolkata Dakshin' },
      { id: 'PS-15', name: 'Govt. School, Salt Lake', address: 'Sector V, Salt Lake, Kolkata - 700091', constituency: 'Bidhannagar' },
      { id: 'PS-101', name: 'Municipal School', address: 'Howrah Maidan, Howrah - 711101', constituency: 'Howrah Uttar' },
    ],
  },
  {
    state: 'Uttarakhand', type: 'State', lsSeats: 5, vsSeats: 70, ceo: 'CEO Uttarakhand', ceoWebsite: 'https://ceouttarakhand.nic.in', helpline: '1950',
    districts: ['Dehradun', 'Haridwar', 'Nainital', 'Udham Singh Nagar', 'Almora', 'Haldwani', 'Kashipur'],
    cities: ['Dehradun', 'Haridwar', 'Haldwani', 'Kashipur', 'Rishikesh', 'Roorkee'],
    booths: [
      { id: 'PS-01', name: 'Govt. Inter College', address: 'Rajpur Road, Dehradun - 248001', constituency: 'Dehradun Cantt' },
      { id: 'PS-10', name: 'Primary School, Clement Town', address: 'Clement Town, Dehradun - 248002', constituency: 'Dehradun' },
      { id: 'PS-101', name: 'Municipal Primary School', address: 'Bazpur Road, Kashipur - 244713', constituency: 'Kashipur' },
      { id: 'PS-102', name: 'Govt. Girls Inter College', address: 'Station Road, Kashipur - 244713', constituency: 'Kashipur' },
      { id: 'PS-103', name: 'Nagar Palika Parishad School', address: 'Ratan Cinema Road, Kashipur - 244713', constituency: 'Kashipur' },
      { id: 'PS-201', name: 'Primary School, Haldwani', address: 'Nainital Road, Haldwani - 263139', constituency: 'Haldwani' },
      { id: 'PS-301', name: 'Govt. School, Haridwar', address: 'Railway Road, Haridwar - 249401', constituency: 'Haridwar' },
    ],
  },
];

const additionalStates = [
  ['Rajasthan', 'State', 25, 200, 'https://ceorajasthan.nic.in', ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Alwar'], ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer']],
  ['Gujarat', 'State', 26, 182, 'https://ceo.gujarat.gov.in', ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Bhavnagar'], ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar']],
  ['Madhya Pradesh', 'State', 29, 230, 'https://ceomadhyapradesh.nic.in', ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Rewa', 'Sagar'], ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain']],
  ['Bihar', 'State', 40, 243, 'https://ceobihar.nic.in', ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Purnia'], ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur']],
  ['Telangana', 'State', 17, 119, 'https://ceotelangana.nic.in', ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'], ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar']],
  ['Andhra Pradesh', 'State', 25, 175, 'https://ceoandhra.nic.in', ['Amaravati', 'Visakhapatnam', 'Vijayawada', 'Tirupati', 'Guntur', 'Nellore', 'East Godavari', 'West Godavari'], ['Visakhapatnam', 'Vijayawada', 'Tirupati', 'Guntur', 'Rajahmundry', 'Eluru']],
  ['Kerala', 'State', 20, 140, 'https://ceo.kerala.gov.in', ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Kannur'], ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur']],
  ['Punjab', 'State', 13, 117, 'https://ceopunjab.nic.in', ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'], ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala']],
  ['Haryana', 'State', 10, 90, 'https://ceoharyana.gov.in', ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal', 'Hisar', 'Rohtak'], ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal']],
  ['Odisha', 'State', 21, 147, 'https://ceoodisha.nic.in', ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri', 'Sambalpur'], ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Puri']],
  ['Assam', 'State', 14, 126, 'https://ceoassam.nic.in', ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Tezpur'], ['Guwahati', 'Silchar', 'Dibrugarh']],
  ['Jharkhand', 'State', 14, 81, 'https://ceojharkhand.nic.in', ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh'], ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro']],
  ['Chhattisgarh', 'State', 11, 90, 'https://ceochhattisgarh.nic.in', ['Raipur', 'Bilaspur', 'Durg', 'Korba', 'Jagdalpur'], ['Raipur', 'Bilaspur', 'Durg', 'Korba']],
  ['Goa', 'State', 2, 40, 'https://ceogoa.nic.in', ['North Goa', 'South Goa'], ['Panaji', 'Margao', 'Vasco da Gama']],
  ['Himachal Pradesh', 'State', 4, 68, 'https://ceohimachal.nic.in', ['Shimla', 'Kangra', 'Mandi', 'Kullu', 'Solan'], ['Shimla', 'Dharamshala', 'Manali', 'Solan']],
  ['Jammu and Kashmir', 'UT', 5, 90, 'https://ceojk.nic.in', ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Udhampur'], ['Srinagar', 'Jammu']],
  ['Chandigarh', 'UT', 1, 0, 'https://ceochandigarh.gov.in', ['Chandigarh'], ['Chandigarh']],
].map(([state, type, lsSeats, vsSeats, ceoWebsite, districts, cities]) => ({
  state,
  type,
  lsSeats,
  vsSeats,
  ceo: `CEO ${state}`,
  ceoWebsite,
  helpline: '1950',
  districts,
  cities,
  booths: cities.slice(0, 3).map((city, index) => ({
    id: `PS-${String(index + 1).padStart(2, '0')}`,
    name: index === 0 ? `Govt. School, ${city}` : `Municipal School, ${city}`,
    address: `${index === 0 ? 'Main Road' : 'Civil Lines'}, ${city}, ${state}`,
    constituency: city,
  })),
}));

export const electionData = [...curatedStates, ...additionalStates];

const compact = (value) => value.toLowerCase().trim();

const createBoothsForLocation = (entry, location) => [
  { id: 'PS-901', name: `Govt. High School, ${location}`, address: `Main Road, ${location}, ${entry.state}`, constituency: location },
  { id: 'PS-902', name: `Municipal Office, ${location}`, address: `Civil Lines, ${location}, ${entry.state}`, constituency: location },
  { id: 'PS-903', name: `Zilla Parishad School, ${location}`, address: `Station Road, ${location}, ${entry.state}`, constituency: location },
];

export function searchElectionInfo(query) {
  if (!query || query.trim().length < 2) return [];

  const q = compact(query);

  const primaryResults = electionData
    .filter((entry) => {
      const stateLower = compact(entry.state);
      return (
        stateLower.includes(q) ||
        q.includes(stateLower) ||
        entry.districts.some((district) => compact(district).includes(q) || q.includes(compact(district))) ||
        entry.cities.some((city) => compact(city).includes(q) || q.includes(compact(city)))
      );
    })
    .map((entry) => {
      const matchedCity = entry.cities.find((city) => compact(city).includes(q) || q.includes(compact(city)));
      const matchedDistrict = entry.districts.find((district) => compact(district).includes(q) || q.includes(compact(district)));
      const matchedLocation = matchedCity || matchedDistrict || entry.state;
      const stateQuery = q.includes(compact(entry.state));

      const filteredBooths = entry.booths.filter((booth) => {
        const haystack = compact(`${booth.name} ${booth.address} ${booth.constituency}`);
        return haystack.includes(q) || stateQuery;
      });

      return {
        ...entry,
        matchedLocation,
        filteredBooths: filteredBooths.length ? filteredBooths : createBoothsForLocation(entry, matchedLocation),
      };
    });

  if (primaryResults.length) return primaryResults;

  const cityMatches = indianCities.filter((city) => compact(city.name).includes(q));
  const uniqueStates = [...new Set(cityMatches.map((city) => city.state))];

  return uniqueStates.map((stateName) => {
    const entry = electionData.find((state) => compact(state.state) === compact(stateName)) || {
      state: stateName,
      type: 'State/UT',
      lsSeats: '-',
      vsSeats: '-',
      ceo: `CEO ${stateName}`,
      ceoWebsite: 'https://eci.gov.in',
      helpline: '1950',
      districts: [],
      cities: [],
      booths: [],
    };
    const matchedLocation = cityMatches.find((city) => city.state === stateName)?.name || stateName;

    return {
      ...entry,
      matchedLocation,
      filteredBooths: createBoothsForLocation(entry, matchedLocation),
    };
  });
}

export default electionData;
