import cookie, { remove } from "react-cookies";
import { handleError } from "./ErrorHandling";
import axios from "axios";
import {
  NotificationError,
  NotificationLoading,
  NotificationSuccess,
} from "./Notifications";
import { Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const timeZones = [
  { label: "Africa/Abidjan", value: "Africa/Abidjan" },
  { label: "Africa/Accra", value: "Africa/Accra" },
  { label: "Africa/Addis_Ababa", value: "Africa/Addis_Ababa" },
  { label: "Africa/Algiers", value: "Africa/Algiers" },
  { label: "Africa/Asmara", value: "Africa/Asmara" },
  { label: "Africa/Bamako", value: "Africa/Bamako" },
  { label: "Africa/Bangui", value: "Africa/Bangui" },
  { label: "Africa/Banjul", value: "Africa/Banjul" },
  { label: "Africa/Bissau", value: "Africa/Bissau" },
  { label: "Africa/Blantyre", value: "Africa/Blantyre" },
  { label: "Africa/Brazzaville", value: "Africa/Brazzaville" },
  { label: "Africa/Bujumbura", value: "Africa/Bujumbura" },
  { label: "Africa/Cairo", value: "Africa/Cairo" },
  { label: "Africa/Casablanca", value: "Africa/Casablanca" },
  { label: "Africa/Ceuta", value: "Africa/Ceuta" },
  { label: "Africa/Conakry", value: "Africa/Conakry" },
  { label: "Africa/Dakar", value: "Africa/Dakar" },
  { label: "Africa/Dar_es_Salaam", value: "Africa/Dar_es_Salaam" },
  { label: "Africa/Djibouti", value: "Africa/Djibouti" },
  { label: "Africa/Douala", value: "Africa/Douala" },
  { label: "Africa/El_Aaiun", value: "Africa/El_Aaiun" },
  { label: "Africa/Freetown", value: "Africa/Freetown" },
  { label: "Africa/Gaborone", value: "Africa/Gaborone" },
  { label: "Africa/Harare", value: "Africa/Harare" },
  { label: "Africa/Johannesburg", value: "Africa/Johannesburg" },
  { label: "Africa/Juba", value: "Africa/Juba" },
  { label: "Africa/Kampala", value: "Africa/Kampala" },
  { label: "Africa/Khartoum", value: "Africa/Khartoum" },
  { label: "Africa/Kigali", value: "Africa/Kigali" },
  { label: "Africa/Kinshasa", value: "Africa/Kinshasa" },
  { label: "Africa/Lagos", value: "Africa/Lagos" },
  { label: "Africa/Libreville", value: "Africa/Libreville" },
  { label: "Africa/Lome", value: "Africa/Lome" },
  { label: "Africa/Luanda", value: "Africa/Luanda" },
  { label: "Africa/Lubumbashi", value: "Africa/Lubumbashi" },
  { label: "Africa/Lusaka", value: "Africa/Lusaka" },
  { label: "Africa/Malabo", value: "Africa/Malabo" },
  { label: "Africa/Maputo", value: "Africa/Maputo" },
  { label: "Africa/Maseru", value: "Africa/Maseru" },
  { label: "Africa/Mbabane", value: "Africa/Mbabane" },
  { label: "Africa/Mogadishu", value: "Africa/Mogadishu" },
  { label: "Africa/Monrovia", value: "Africa/Monrovia" },
  { label: "Africa/Nairobi", value: "Africa/Nairobi" },
  { label: "Africa/Ndjamena", value: "Africa/Ndjamena" },
  { label: "Africa/Niamey", value: "Africa/Niamey" },
  { label: "Africa/Nouakchott", value: "Africa/Nouakchott" },
  { label: "Africa/Ouagadougou", value: "Africa/Ouagadougou" },
  { label: "Africa/Porto-Novo", value: "Africa/Porto-Novo" },
  { label: "Africa/Sao_Tome", value: "Africa/Sao_Tome" },
  { label: "Africa/Tripoli", value: "Africa/Tripoli" },
  { label: "Africa/Tunis", value: "Africa/Tunis" },
  { label: "Africa/Windhoek", value: "Africa/Windhoek" },
  { label: "America/Adak", value: "America/Adak" },
  { label: "America/Anchorage", value: "America/Anchorage" },
  { label: "America/Anguilla", value: "America/Anguilla" },
  { label: "America/Antigua", value: "America/Antigua" },
  { label: "America/Araguaina", value: "America/Araguaina" },
  {
    label: "America/Argentina/Buenos_Aires",
    value: "America/Argentina/Buenos_Aires",
  },
  {
    label: "America/Argentina/Catamarca",
    value: "America/Argentina/Catamarca",
  },
  { label: "America/Argentina/Cordoba", value: "America/Argentina/Cordoba" },
  { label: "America/Argentina/Jujuy", value: "America/Argentina/Jujuy" },
  { label: "America/Argentina/La_Rioja", value: "America/Argentina/La_Rioja" },
  { label: "America/Argentina/Mendoza", value: "America/Argentina/Mendoza" },
  {
    label: "America/Argentina/Rio_Gallegos",
    value: "America/Argentina/Rio_Gallegos",
  },
  { label: "America/Argentina/Salta", value: "America/Argentina/Salta" },
  { label: "America/Argentina/San_Juan", value: "America/Argentina/San_Juan" },
  { label: "America/Argentina/San_Luis", value: "America/Argentina/San_Luis" },
  { label: "America/Argentina/Tucuman", value: "America/Argentina/Tucuman" },
  { label: "America/Argentina/Ushuaia", value: "America/Argentina/Ushuaia" },
  { label: "America/Aruba", value: "America/Aruba" },
  { label: "America/Asuncion", value: "America/Asuncion" },
  { label: "America/Atikokan", value: "America/Atikokan" },
  { label: "America/Bahia", value: "America/Bahia" },
  { label: "America/Bahia_Banderas", value: "America/Bahia_Banderas" },
  { label: "America/Barbados", value: "America/Barbados" },
  { label: "America/Belem", value: "America/Belem" },
  { label: "America/Belize", value: "America/Belize" },
  { label: "America/Blanc-Sablon", value: "America/Blanc-Sablon" },
  { label: "America/Boa_Vista", value: "America/Boa_Vista" },
  { label: "America/Bogota", value: "America/Bogota" },
  { label: "America/Boise", value: "America/Boise" },
  { label: "America/Cambridge_Bay", value: "America/Cambridge_Bay" },
  { label: "America/Campo_Grande", value: "America/Campo_Grande" },
  { label: "America/Cancun", value: "America/Cancun" },
  { label: "America/Caracas", value: "America/Caracas" },
  { label: "America/Cayenne", value: "America/Cayenne" },
  { label: "America/Cayman", value: "America/Cayman" },
  { label: "America/Chicago", value: "America/Chicago" },
  { label: "America/Chihuahua", value: "America/Chihuahua" },
  { label: "America/Costa_Rica", value: "America/Costa_Rica" },
  { label: "America/Creston", value: "America/Creston" },
  { label: "America/Cuiaba", value: "America/Cuiaba" },
  { label: "America/Curacao", value: "America/Curacao" },
  { label: "America/Danmarkshavn", value: "America/Danmarkshavn" },
  { label: "America/Dawson", value: "America/Dawson" },
  { label: "America/Dawson_Creek", value: "America/Dawson_Creek" },
  { label: "America/Denver", value: "America/Denver" },
  { label: "America/Detroit", value: "America/Detroit" },
  { label: "America/Dominica", value: "America/Dominica" },
  { label: "America/Edmonton", value: "America/Edmonton" },
  { label: "America/Eirunepe", value: "America/Eirunepe" },
  { label: "America/El_Salvador", value: "America/El_Salvador" },
  { label: "America/Fortaleza", value: "America/Fortaleza" },
  { label: "America/Glace_Bay", value: "America/Glace_Bay" },
  { label: "America/Godthab", value: "America/Godthab" },
  { label: "America/Goose_Bay", value: "America/Goose_Bay" },
  { label: "America/Grand_Turk", value: "America/Grand_Turk" },
  { label: "America/Grenada", value: "America/Grenada" },
  { label: "America/Guadeloupe", value: "America/Guadeloupe" },
  { label: "America/Guatemala", value: "America/Guatemala" },
  { label: "America/Guayaquil", value: "America/Guayaquil" },
  { label: "America/Guyana", value: "America/Guyana" },
  { label: "America/Halifax", value: "America/Halifax" },
  { label: "America/Havana", value: "America/Havana" },
  { label: "America/Hawaii", value: "America/Hawaii" },
  { label: "America/Hermosillo", value: "America/Hermosillo" },
  {
    label: "America/Indiana/Indianapolis",
    value: "America/Indiana/Indianapolis",
  },
  { label: "America/Indiana/Knox", value: "America/Indiana/Knox" },
  { label: "America/Indiana/Marengo", value: "America/Indiana/Marengo" },
  { label: "America/Indiana/Petersburg", value: "America/Indiana/Petersburg" },
  { label: "America/Indiana/Tell_City", value: "America/Indiana/Tell_City" },
  { label: "America/Indiana/Vevay", value: "America/Indiana/Vevay" },
  { label: "America/Indiana/Vincennes", value: "America/Indiana/Vincennes" },
  { label: "America/Indiana/Winamac", value: "America/Indiana/Winamac" },
  { label: "America/Inuvik", value: "America/Inuvik" },
  { label: "America/Iqaluit", value: "America/Iqaluit" },
  { label: "America/Jamaica", value: "America/Jamaica" },
  { label: "America/Juneau", value: "America/Juneau" },
  {
    label: "America/Kentucky/Louisville",
    value: "America/Kentucky/Louisville",
  },
  {
    label: "America/Kentucky/Monticello",
    value: "America/Kentucky/Monticello",
  },
  { label: "America/Kralendijk", value: "America/Kralendijk" },
  { label: "America/La_Paz", value: "America/La_Paz" },
  { label: "America/Lima", value: "America/Lima" },
  { label: "America/Los_Angeles", value: "America/Los_Angeles" },
  { label: "America/Lower_Princes", value: "America/Lower_Princes" },
  { label: "America/Maceio", value: "America/Maceio" },
  { label: "America/Managua", value: "America/Managua" },
  { label: "America/Manaus", value: "America/Manaus" },
  { label: "America/Marigot", value: "America/Marigot" },
  { label: "America/Martinique", value: "America/Martinique" },
  { label: "America/Matamoros", value: "America/Matamoros" },
  { label: "America/Mazatlan", value: "America/Mazatlan" },
  { label: "America/Menominee", value: "America/Menominee" },
  { label: "America/Merida", value: "America/Merida" },
  { label: "America/Metlakatla", value: "America/Metlakatla" },
  { label: "America/Mexico_City", value: "America/Mexico_City" },
  { label: "America/Miquelon", value: "America/Miquelon" },
  { label: "America/Moncton", value: "America/Moncton" },
  { label: "America/Monterrey", value: "America/Monterrey" },
  { label: "America/Montevideo", value: "America/Montevideo" },
  { label: "America/Montserrat", value: "America/Montserrat" },
  { label: "America/Nassau", value: "America/Nassau" },
  { label: "America/New_York", value: "America/New_York" },
  { label: "America/Nipigon", value: "America/Nipigon" },
  { label: "America/Nome", value: "America/Nome" },
  { label: "America/Noronha", value: "America/Noronha" },
  {
    label: "America/North_Dakota/Beulah",
    value: "America/North_Dakota/Beulah",
  },
  {
    label: "America/North_Dakota/Center",
    value: "America/North_Dakota/Center",
  },
  {
    label: "America/North_Dakota/New_Salem",
    value: "America/North_Dakota/New_Salem",
  },
  { label: "America/Ojinaga", value: "America/Ojinaga" },
  { label: "America/Panama", value: "America/Panama" },
  { label: "America/Pangnirtung", value: "America/Pangnirtung" },
  { label: "America/Paramaribo", value: "America/Paramaribo" },
  { label: "America/Phoenix", value: "America/Phoenix" },
  { label: "America/Port-au-Prince", value: "America/Port-au-Prince" },
  { label: "America/Porto_Velho", value: "America/Porto_Velho" },
  { label: "America/Port_of_Spain", value: "America/Port_of_Spain" },
  { label: "America/Puerto_Rico", value: "America/Puerto_Rico" },
  { label: "America/Rainy_River", value: "America/Rainy_River" },
  { label: "America/Rankin_Inlet", value: "America/Rankin_Inlet" },
  { label: "America/Recife", value: "America/Recife" },
  { label: "America/Regina", value: "America/Regina" },
  { label: "America/Resolute", value: "America/Resolute" },
  { label: "America/Rio_Branco", value: "America/Rio_Branco" },
  { label: "America/Santarem", value: "America/Santarem" },
  { label: "America/Santa_Isabel", value: "America/Santa_Isabel" },
  { label: "America/Santiago", value: "America/Santiago" },
  { label: "America/Santo_Domingo", value: "America/Santo_Domingo" },
  { label: "America/Sao_Paulo", value: "America/Sao_Paulo" },
  { label: "America/Scoresbysund", value: "America/Scoresbysund" },
  { label: "America/Sitka", value: "America/Sitka" },
  { label: "America/St_Barthelemy", value: "America/St_Barthelemy" },
  { label: "America/St_Johns", value: "America/St_Johns" },
  { label: "America/St_Kitts", value: "America/St_Kitts" },
  { label: "America/St_Lucia", value: "America/St_Lucia" },
  { label: "America/St_Thomas", value: "America/St_Thomas" },
  { label: "America/St_Vincent", value: "America/St_Vincent" },
  { label: "America/Swift_Current", value: "America/Swift_Current" },
  { label: "America/Tegucigalpa", value: "America/Tegucigalpa" },
  { label: "America/Thule", value: "America/Thule" },
  { label: "America/Thunder_Bay", value: "America/Thunder_Bay" },
  { label: "America/Tijuana", value: "America/Tijuana" },
  { label: "America/Toronto", value: "America/Toronto" },
  { label: "America/Tortola", value: "America/Tortola" },
  { label: "America/Vancouver", value: "America/Vancouver" },
  { label: "America/Whitehorse", value: "America/Whitehorse" },
  { label: "America/Winnipeg", value: "America/Winnipeg" },
  { label: "America/Yakutat", value: "America/Yakutat" },
  { label: "America/Yellowknife", value: "America/Yellowknife" },
  { label: "Antarctica/Casey", value: "Antarctica/Casey" },
  { label: "Antarctica/Davis", value: "Antarctica/Davis" },
  { label: "Antarctica/DumontDUrville", value: "Antarctica/DumontDUrville" },
  { label: "Antarctica/Macquarie", value: "Antarctica/Macquarie" },
  { label: "Antarctica/Mawson", value: "Antarctica/Mawson" },
  { label: "Antarctica/McMurdo", value: "Antarctica/McMurdo" },
  { label: "Antarctica/Palmer", value: "Antarctica/Palmer" },
  { label: "Antarctica/Rothera", value: "Antarctica/Rothera" },
  { label: "Antarctica/Syowa", value: "Antarctica/Syowa" },
  { label: "Antarctica/Vostok", value: "Antarctica/Vostok" },
  { label: "Arctic/Longyearbyen", value: "Arctic/Longyearbyen" },
  { label: "Asia/Aden", value: "Asia/Aden" },
  { label: "Asia/Almaty", value: "Asia/Almaty" },
  { label: "Asia/Amman", value: "Asia/Amman" },
  { label: "Asia/Anadyr", value: "Asia/Anadyr" },
  { label: "Asia/Aqtau", value: "Asia/Aqtau" },
  { label: "Asia/Aqtobe", value: "Asia/Aqtobe" },
  { label: "Asia/Ashgabat", value: "Asia/Ashgabat" },
  { label: "Asia/Baghdad", value: "Asia/Baghdad" },
  { label: "Asia/Bahrain", value: "Asia/Bahrain" },
  { label: "Asia/Baku", value: "Asia/Baku" },
  { label: "Asia/Bangkok", value: "Asia/Bangkok" },
  { label: "Asia/Beirut", value: "Asia/Beirut" },
  { label: "Asia/Bishkek", value: "Asia/Bishkek" },
  { label: "Asia/Brunei", value: "Asia/Brunei" },
  { label: "Asia/Choibalsan", value: "Asia/Choibalsan" },
  { label: "Asia/Chongqing", value: "Asia/Chongqing" },
  { label: "Asia/Colombo", value: "Asia/Colombo" },
  { label: "Asia/Damascus", value: "Asia/Damascus" },
  { label: "Asia/Dhaka", value: "Asia/Dhaka" },
  { label: "Asia/Dili", value: "Asia/Dili" },
  { label: "Asia/Dubai", value: "Asia/Dubai" },
  { label: "Asia/Dushanbe", value: "Asia/Dushanbe" },
  { label: "Asia/Famagusta", value: "Asia/Famagusta" },
  { label: "Asia/Gaza", value: "Asia/Gaza" },
  { label: "Asia/Harbin", value: "Asia/Harbin" },
  { label: "Asia/Hebron", value: "Asia/Hebron" },
  { label: "Asia/Ho_Chi_Minh", value: "Asia/Ho_Chi_Minh" },
  { label: "Asia/Hong_Kong", value: "Asia/Hong_Kong" },
  { label: "Asia/Hovd", value: "Asia/Hovd" },
  { label: "Asia/Irkutsk", value: "Asia/Irkutsk" },
  { label: "Asia/Jakarta", value: "Asia/Jakarta" },
  { label: "Asia/Jayapura", value: "Asia/Jayapura" },
  { label: "Asia/Jerusalem", value: "Asia/Jerusalem" },
  { label: "Asia/Kabul", value: "Asia/Kabul" },
  { label: "Asia/Kamchatka", value: "Asia/Kamchatka" },
  { label: "Asia/Karachi", value: "Asia/Karachi" },
  { label: "Asia/Kathmandu", value: "Asia/Kathmandu" },
  { label: "Asia/Khandyga", value: "Asia/Khandyga" },
  { label: "Asia/Kolkata", value: "Asia/Kolkata" },
  { label: "Asia/Krasnoyarsk", value: "Asia/Krasnoyarsk" },
  { label: "Asia/Kuala_Lumpur", value: "Asia/Kuala_Lumpur" },
  { label: "Asia/Kuching", value: "Asia/Kuching" },
  { label: "Asia/Kuwait", value: "Asia/Kuwait" },
  { label: "Asia/Macau", value: "Asia/Macau" },
  { label: "Asia/Magadan", value: "Asia/Magadan" },
  { label: "Asia/Makassar", value: "Asia/Makassar" },
  { label: "Asia/Manila", value: "Asia/Manila" },
  { label: "Asia/Muscat", value: "Asia/Muscat" },
  { label: "Asia/Nicosia", value: "Asia/Nicosia" },
  { label: "Asia/Novokuznetsk", value: "Asia/Novokuznetsk" },
  { label: "Asia/Novosibirsk", value: "Asia/Novosibirsk" },
  { label: "Asia/Omsk", value: "Asia/Omsk" },
  { label: "Asia/Oral", value: "Asia/Oral" },
  { label: "Asia/Phnom_Penh", value: "Asia/Phnom_Penh" },
  { label: "Asia/Pontianak", value: "Asia/Pontianak" },
  { label: "Asia/Pyongyang", value: "Asia/Pyongyang" },
  { label: "Asia/Qatar", value: "Asia/Qatar" },
  { label: "Asia/Qyzylorda", value: "Asia/Qyzylorda" },
  { label: "Asia/Rangoon", value: "Asia/Rangoon" },
  { label: "Asia/Riyadh", value: "Asia/Riyadh" },
  { label: "Asia/Sakhalin", value: "Asia/Sakhalin" },
  { label: "Asia/Samarkand", value: "Asia/Samarkand" },
  { label: "Asia/Seoul", value: "Asia/Seoul" },
  { label: "Asia/Shanghai", value: "Asia/Shanghai" },
  { label: "Asia/Singapore", value: "Asia/Singapore" },
  { label: "Asia/Taipei", value: "Asia/Taipei" },
  { label: "Asia/Tashkent", value: "Asia/Tashkent" },
  { label: "Asia/Tbilisi", value: "Asia/Tbilisi" },
  { label: "Asia/Tehran", value: "Asia/Tehran" },
  { label: "Asia/Thimphu", value: "Asia/Thimphu" },
  { label: "Asia/Tokyo", value: "Asia/Tokyo" },
  { label: "Asia/Ulaanbaatar", value: "Asia/Ulaanbaatar" },
  { label: "Asia/Urumqi", value: "Asia/Urumqi" },
  { label: "Asia/Ust-Nera", value: "Asia/Ust-Nera" },
  { label: "Asia/Vientiane", value: "Asia/Vientiane" },
  { label: "Asia/Vladivostok", value: "Asia/Vladivostok" },
  { label: "Asia/Yakutsk", value: "Asia/Yakutsk" },
  { label: "Asia/Yekaterinburg", value: "Asia/Yekaterinburg" },
  { label: "Asia/Yerevan", value: "Asia/Yerevan" },
  { label: "Atlantic/Azores", value: "Atlantic/Azores" },
  { label: "Atlantic/Bermuda", value: "Atlantic/Bermuda" },
  { label: "Atlantic/Canary", value: "Atlantic/Canary" },
  { label: "Atlantic/Cape_Verde", value: "Atlantic/Cape_Verde" },
  { label: "Atlantic/Faroe", value: "Atlantic/Faroe" },
  { label: "Atlantic/Madeira", value: "Atlantic/Madeira" },
  { label: "Atlantic/Reykjavik", value: "Atlantic/Reykjavik" },
  { label: "Atlantic/South_Georgia", value: "Atlantic/South_Georgia" },
  { label: "Atlantic/St_Helena", value: "Atlantic/St_Helena" },
  { label: "Atlantic/Stanley", value: "Atlantic/Stanley" },
  { label: "Australia/Adelaide", value: "Australia/Adelaide" },
  { label: "Australia/Brisbane", value: "Australia/Brisbane" },
  { label: "Australia/Broken_Hill", value: "Australia/Broken_Hill" },
  { label: "Australia/Currie", value: "Australia/Currie" },
  { label: "Australia/Darwin", value: "Australia/Darwin" },
  { label: "Australia/Eucla", value: "Australia/Eucla" },
  { label: "Australia/Hobart", value: "Australia/Hobart" },
  { label: "Australia/Lindeman", value: "Australia/Lindeman" },
  { label: "Australia/Lord_Howe", value: "Australia/Lord_Howe" },
  { label: "Australia/Melbourne", value: "Australia/Melbourne" },
  { label: "Australia/Perth", value: "Australia/Perth" },
  { label: "Australia/Sydney", value: "Australia/Sydney" },
  { label: "Europe/Amsterdam", value: "Europe/Amsterdam" },
  { label: "Europe/Andorra", value: "Europe/Andorra" },
  { label: "Europe/Athens", value: "Europe/Athens" },
  { label: "Europe/Belgrade", value: "Europe/Belgrade" },
  { label: "Europe/Berlin", value: "Europe/Berlin" },
  { label: "Europe/Bratislava", value: "Europe/Bratislava" },
  { label: "Europe/Brussels", value: "Europe/Brussels" },
  { label: "Europe/Bucharest", value: "Europe/Bucharest" },
  { label: "Europe/Budapest", value: "Europe/Budapest" },
  { label: "Europe/Busingen", value: "Europe/Busingen" },
  { label: "Europe/Chisinau", value: "Europe/Chisinau" },
  { label: "Europe/Copenhagen", value: "Europe/Copenhagen" },
  { label: "Europe/Dublin", value: "Europe/Dublin" },
  { label: "Europe/Gibraltar", value: "Europe/Gibraltar" },
  { label: "Europe/Guernsey", value: "Europe/Guernsey" },
  { label: "Europe/Helsinki", value: "Europe/Helsinki" },
  { label: "Europe/Isle_of_Man", value: "Europe/Isle_of_Man" },
  { label: "Europe/Istanbul", value: "Europe/Istanbul" },
  { label: "Europe/Jersey", value: "Europe/Jersey" },
  { label: "Europe/Kaliningrad", value: "Europe/Kaliningrad" },
  { label: "Europe/Kiev", value: "Europe/Kiev" },
  { label: "Europe/Lisbon", value: "Europe/Lisbon" },
  { label: "Europe/Ljubljana", value: "Europe/Ljubljana" },
  { label: "Europe/London", value: "Europe/London" },
  { label: "Europe/Luxembourg", value: "Europe/Luxembourg" },
  { label: "Europe/Madrid", value: "Europe/Madrid" },
  { label: "Europe/Malta", value: "Europe/Malta" },
  { label: "Europe/Mariehamn", value: "Europe/Mariehamn" },
  { label: "Europe/Minsk", value: "Europe/Minsk" },
  { label: "Europe/Monaco", value: "Europe/Monaco" },
  { label: "Europe/Moscow", value: "Europe/Moscow" },
  { label: "Europe/Oslo", value: "Europe/Oslo" },
  { label: "Europe/Paris", value: "Europe/Paris" },
  { label: "Europe/Podgorica", value: "Europe/Podgorica" },
  { label: "Europe/Prague", value: "Europe/Prague" },
  { label: "Europe/Riga", value: "Europe/Riga" },
  { label: "Europe/Rome", value: "Europe/Rome" },
  { label: "Europe/Samara", value: "Europe/Samara" },
  { label: "Europe/San_Marino", value: "Europe/San_Marino" },
  { label: "Europe/Sarajevo", value: "Europe/Sarajevo" },
  { label: "Europe/Simferopol", value: "Europe/Simferopol" },
  { label: "Europe/Skopje", value: "Europe/Skopje" },
  { label: "Europe/Sofia", value: "Europe/Sofia" },
  { label: "Europe/Stockholm", value: "Europe/Stockholm" },
  { label: "Europe/Tallinn", value: "Europe/Tallinn" },
  { label: "Europe/Tirane", value: "Europe/Tirane" },
  { label: "Europe/Uzhgorod", value: "Europe/Uzhgorod" },
  { label: "Europe/Vaduz", value: "Europe/Vaduz" },
  { label: "Europe/Vatican", value: "Europe/Vatican" },
  { label: "Europe/Vienna", value: "Europe/Vienna" },
  { label: "Europe/Vilnius", value: "Europe/Vilnius" },
  { label: "Europe/Volgograd", value: "Europe/Volgograd" },
  { label: "Europe/Warsaw", value: "Europe/Warsaw" },
  { label: "Europe/Zagreb", value: "Europe/Zagreb" },
  { label: "Europe/Zaporozhye", value: "Europe/Zaporozhye" },
  { label: "Europe/Zurich", value: "Europe/Zurich" },
  { label: "Indian/Antananarivo", value: "Indian/Antananarivo" },
  { label: "Indian/Chagos", value: "Indian/Chagos" },
  { label: "Indian/Christmas", value: "Indian/Christmas" },
  { label: "Indian/Cocos", value: "Indian/Cocos" },
  { label: "Indian/Comoro", value: "Indian/Comoro" },
  { label: "Indian/Kerguelen", value: "Indian/Kerguelen" },
  { label: "Indian/Mahe", value: "Indian/Mahe" },
  { label: "Indian/Maldives", value: "Indian/Maldives" },
  { label: "Indian/Mauritius", value: "Indian/Mauritius" },
  { label: "Indian/Mayotte", value: "Indian/Mayotte" },
  { label: "Indian/Reunion", value: "Indian/Reunion" },
  { label: "Pacific/Apia", value: "Pacific/Apia" },
  { label: "Pacific/Auckland", value: "Pacific/Auckland" },
  { label: "Pacific/Chatham", value: "Pacific/Chatham" },
  { label: "Pacific/Chuuk", value: "Pacific/Chuuk" },
  { label: "Pacific/Easter", value: "Pacific/Easter" },
  { label: "Pacific/Efate", value: "Pacific/Efate" },
  { label: "Pacific/Enderbury", value: "Pacific/Enderbury" },
  { label: "Pacific/Fakaofo", value: "Pacific/Fakaofo" },
  { label: "Pacific/Fiji", value: "Pacific/Fiji" },
  { label: "Pacific/Funafuti", value: "Pacific/Funafuti" },
  { label: "Pacific/Galapagos", value: "Pacific/Galapagos" },
  { label: "Pacific/Gambier", value: "Pacific/Gambier" },
  { label: "Pacific/Guadalcanal", value: "Pacific/Guadalcanal" },
  { label: "Pacific/Guam", value: "Pacific/Guam" },
  { label: "Pacific/Honolulu", value: "Pacific/Honolulu" },
  { label: "Pacific/Johnston", value: "Pacific/Johnston" },
  { label: "Pacific/Kiritimati", value: "Pacific/Kiritimati" },
  { label: "Pacific/Kosrae", value: "Pacific/Kosrae" },
  { label: "Pacific/Kwajalein", value: "Pacific/Kwajalein" },
  { label: "Pacific/Majuro", value: "Pacific/Majuro" },
  { label: "Pacific/Marquesas", value: "Pacific/Marquesas" },
  { label: "Pacific/Midway", value: "Pacific/Midway" },
  { label: "Pacific/Nauru", value: "Pacific/Nauru" },
  { label: "Pacific/Niue", value: "Pacific/Niue" },
  { label: "Pacific/Norfolk", value: "Pacific/Norfolk" },
  { label: "Pacific/Noumea", value: "Pacific/Noumea" },
  { label: "Pacific/Pago_Pago", value: "Pacific/Pago_Pago" },
  { label: "Pacific/Palau", value: "Pacific/Palau" },
  { label: "Pacific/Pitcairn", value: "Pacific/Pitcairn" },
  { label: "Pacific/Pohnpei", value: "Pacific/Pohnpei" },
  { label: "Pacific/Port_Moresby", value: "Pacific/Port_Moresby" },
  { label: "Pacific/Rarotonga", value: "Pacific/Rarotonga" },
  { label: "Pacific/Saipan", value: "Pacific/Saipan" },
  { label: "Pacific/Tahiti", value: "Pacific/Tahiti" },
  { label: "Pacific/Tarawa", value: "Pacific/Tarawa" },
  { label: "Pacific/Tongatapu", value: "Pacific/Tongatapu" },
  { label: "Pacific/Wake", value: "Pacific/Wake" },
  { label: "Pacific/Wallis", value: "Pacific/Wallis" },
  { label: "UTC", value: "UTC" },
];

const jobcategories = [
  { label: <div style={{ backgroundColor: "rgba(52, 152, 219, 1)" }} className="text-white w-fit px-2 rounded-full">Web Development and Design</div>, value: "Web Development and Design" },
  { label: <div style={{ backgroundColor: "orange" }} className="text-white w-fit px-2 rounded-full">Writing and Content</div>, value: "Writing and Content" },
  { label: <div style={{ backgroundColor: "rgba(22, 160, 133, 1)" }} className="text-white w-fit px-2 rounded-full">Digital Marketing</div>, value: "Digital Marketing" },
  { label: <div style={{ backgroundColor: "rgba(46, 204, 113, 1)" }} className="text-white w-fit px-2 rounded-full">Data Entry and Virtual Assistance</div>, value: "Data Entry and Virtual Assistance" },
  { label: <div style={{ backgroundColor: "rgba(44, 62, 80, 1)" }} className="text-white w-fit px-2 rounded-full">Translation and Language Services</div>, value: "Translation and Language Services" },
  { label: <div style={{ backgroundColor: "rgba(169, 50, 38, 1)" }} className="text-white w-fit px-2 rounded-full">IT and Software</div>, value: "IT and Software" },
  { label: <div style={{ backgroundColor: "rgba(142, 68, 173, 1)" }} className="text-white w-fit px-2 rounded-full">Sales and Marketing</div>, value: "Sales and Marketing" },
  { label: <div style={{ backgroundColor: "rgba(230, 126, 34, 1)" }} className="text-white w-fit px-2 rounded-full">Video and Animation</div>, value: "Video and Animation" },
  { label: <div style={{ backgroundColor: "rgba(41, 128, 185, 1)" }} className="text-white w-fit px-2 rounded-full">Customer Support and Service</div>, value: "Customer Support and Service" },
  { label: <div style={{ backgroundColor: "rgba(189, 195, 199, 1)" }} className="text-white w-fit px-2 rounded-full">Consulting and Business Services</div>, value: "Consulting and Business Services" },
  { label: <div style={{ backgroundColor: "rgba(243, 156, 18, 1)" }} className="text-white w-fit px-2 rounded-full">Engineering and Architecture</div>, value: "Engineering and Architecture" },
  { label: <div style={{ backgroundColor: "rgba(46, 204, 113, 1)" }} className="text-white w-fit px-2 rounded-full">E-commerce</div>, value: "E-commerce" },
  { label: <div style={{ backgroundColor: "rgba(52, 152, 219, 1)" }} className="text-white w-fit px-2 rounded-full">Video and Audio Services</div>, value: "Video and Audio Services" },
  { label: <div style={{ backgroundColor: "rgba(44, 62, 80, 1)" }} className="text-white w-fit px-2 rounded-full">Marketing and Sales</div>, value: "Marketing and Sales" },
  { label: <div style={{ backgroundColor: "rgba(241, 196, 15, 1)" }} className="text-white w-fit px-2 rounded-full">Education and Training</div>, value: "Education and Training" },
  { label: <div style={{ backgroundColor: "rgba(155, 89, 182, 1)" }} className="text-white w-fit px-2 rounded-full">Healthcare and Medical Services</div>, value: "Healthcare and Medical Services" },
  { label: <div style={{ backgroundColor: "rgba(52, 73, 94, 1)" }} className="text-white w-fit px-2 rounded-full">Legal Services</div>, value: "Legal Services" },
  { label: <div style={{ backgroundColor: "rgba(52, 152, 219, 1)" }} className="text-white w-fit px-2 rounded-full">Accounting and Finance</div>, value: "Accounting and Finance" },
  { label: <div style={{ backgroundColor: "rgba(230, 126, 34, 1)" }} className="text-white w-fit px-2 rounded-full">Photography and Videography</div>, value: "Photography and Videography" },
  { label: <div style={{ backgroundColor: "rgba(142, 68, 173, 1)" }} className="text-white w-fit px-2 rounded-full">Gaming</div>, value: "Gaming" },
  { label: <div style={{ backgroundColor: "rgba(5, 14, 42, 1)" }} className="text-white w-fit px-2 rounded-full">Art and Illustration</div>, value: "Art and Illustration" },
  { label: <div style={{ backgroundColor: "rgba(0, 77, 64, 1)" }} className="text-white w-fit px-2 rounded-full">Travel and Lifestyle</div>, value: "Travel and Lifestyle" },
  { label: <div style={{ backgroundColor: "rgba(46, 204, 113, 1)" }} className="text-white w-fit px-2 rounded-full">Science and Research</div>, value: "Science and Research" },
  { label: <div style={{ backgroundColor: "rgba(169, 50, 38, 1)" }} className="text-white w-fit px-2 rounded-full">Manufacturing and Product Design</div>, value: "Manufacturing and Product Design" },
  { label: <div style={{ backgroundColor: "rgba(44, 62, 80, 1)" }} className="text-white w-fit px-2 rounded-full">Human Resources</div>, value: "Human Resources" },
  { label: <div style={{ backgroundColor: "rgba(52, 152, 219, 1)" }} className="text-white w-fit px-2 rounded-full">Real Estate</div>, value: "Real Estate" },
  { label: <div style={{ backgroundColor: "rgba(46, 204, 113, 1)" }} className="text-white w-fit px-2 rounded-full">Blockchain and Cryptocurrency</div>, value: "Blockchain and Cryptocurrency" },
  { label: <div style={{ backgroundColor: "rgba(52, 73, 94, 1)" }} className="text-white w-fit px-2 rounded-full">Food and Culinary</div>, value: "Food and Culinary" },
  { label: <div style={{ backgroundColor: "rgba(46, 204, 113, 1)" }} className="text-white w-fit px-2 rounded-full">Environmental and Sustainability</div>, value: "Environmental and Sustainability" },
  { label: <div style={{ backgroundColor: "rgba(44, 62, 80, 1)" }} className="text-white w-fit px-2 rounded-full">Nonprofit and Social Services</div>, value: "Nonprofit and Social Services" },
];

const jobCat = [
  { label: "Web Development and Design", value: "Web Development and Design" },
  { label: "Writing and Content", value: "Writing and Content" },
  { label: "Digital Marketing", value: "Digital Marketing" },
  { label: "Data Entry and Virtual Assistance", value: "Data Entry and Virtual Assistance" },
  { label: "Translation and Language Services", value: "Translation and Language Services" },
  { label: "IT and Software", value: "IT and Software" },
  { label: "Sales and Marketing", value: "Sales and Marketing" },
  { label: "Video and Animation", value: "Video and Animation" },
  { label: "Customer Support and Service", value: "Customer Support and Service" },
  { label: "Consulting and Business Services", value: "Consulting and Business Services" },
  { label: "Engineering and Architecture", value: "Engineering and Architecture" },
  { label: "E-commerce", value: "E-commerce" },
  { label: "Video and Audio Services", value: "Video and Audio Services" },
  { label: "Marketing and Sales", value: "Marketing and Sales" },
  { label: "Education and Training", value: "Education and Training" },
  { label: "Healthcare and Medical Services", value: "Healthcare and Medical Services" },
  { label: "Legal Services", value: "Legal Services" },
  { label: "Accounting and Finance", value: "Accounting and Finance" },
  { label: "Photography and Videography", value: "Photography and Videography" },
  { label: "Gaming", value: "Gaming" },
  { label: "Art and Illustration", value: "Art and Illustration" },
  { label: "Travel and Lifestyle", value: "Travel and Lifestyle" },
  { label: "Science and Research", value: "Science and Research" },
  { label: "Manufacturing and Product Design", value: "Manufacturing and Product Design" },
  { label: "Human Resources", value: "Human Resources" },
  { label: "Real Estate", value: "Real Estate" },
  { label: "Blockchain and Cryptocurrency", value: "Blockchain and Cryptocurrency" },
  { label: "Food and Culinary", value: "Food and Culinary" },
  { label: "Environmental and Sustainability", value: "Environmental and Sustainability" },
  { label: "Nonprofit and Social Services", value: "Nonprofit and Social Services" }
]


const currencies = [
  {
    "value": "AED",
    "label": "AED - United Arab Emirates Dirham"
  },
  {
    "value": "AFN",
    "label": "AFN - Afghan Afghani"
  },
  {
    "value": "ALL",
    "label": "ALL - Albanian Lek"
  },
  {
    "value": "AMD",
    "label": "AMD - Armenian Dram"
  },
  {
    "value": "ANG",
    "label": "ANG - Netherlands Antillean Guilder"
  },
  {
    "value": "AOA",
    "label": "AOA - Angolan Kwanza"
  },
  {
    "value": "ARS",
    "label": "ARS - Argentine Peso"
  },
  {
    "value": "AUD",
    "label": "AUD - Australian Dollar"
  },
  {
    "value": "AWG",
    "label": "AWG - Aruban Florin"
  },
  {
    "value": "AZN",
    "label": "AZN - Azerbaijani Manat"
  },
  {
    "value": "BAM",
    "label": "BAM - Bosnia-Herzegovina Convertible Mark"
  },
  {
    "value": "BBD",
    "label": "BBD - Barbadian Dollar"
  },
  {
    "value": "BDT",
    "label": "BDT - Bangladeshi Taka"
  },
  {
    "value": "BGN",
    "label": "BGN - Bulgarian Lev"
  },
  {
    "value": "BHD",
    "label": "BHD - Bahraini Dinar"
  },
  {
    "value": "BIF",
    "label": "BIF - Burundian Franc"
  },
  {
    "value": "BMD",
    "label": "BMD - Bermudian Dollar"
  },
  {
    "value": "BND",
    "label": "BND - Brunei Dollar"
  },
  {
    "value": "BOB",
    "label": "BOB - Bolivian Boliviano"
  },
  {
    "value": "BRL",
    "label": "BRL - Brazilian Real"
  },
  {
    "value": "BSD",
    "label": "BSD - Bahamian Dollar"
  },
  {
    "value": "BTN",
    "label": "BTN - Bhutanese Ngultrum"
  },
  {
    "value": "BWP",
    "label": "BWP - Botswanan Pula"
  },
  {
    "value": "BYN",
    "label": "BYN - Belarusian Ruble"
  },
  {
    "value": "BZD",
    "label": "BZD - Belize Dollar"
  },
  {
    "value": "CAD",
    "label": "CAD - Canadian Dollar"
  },
  {
    "value": "CDF",
    "label": "CDF - Congolese Franc"
  },
  {
    "value": "CHF",
    "label": "CHF - Swiss Franc"
  },
  {
    "value": "CLP",
    "label": "CLP - Chilean Peso"
  },
  {
    "value": "CNY",
    "label": "CNY - Chinese Yuan"
  },
  {
    "value": "COP",
    "label": "COP - Colombian Peso"
  },
  {
    "value": "CRC",
    "label": "CRC - Costa Rican Colón"
  },
  {
    "value": "CUP",
    "label": "CUP - Cuban Peso"
  },
  {
    "value": "CVE",
    "label": "CVE - Cape Verdean Escudo"
  },
  {
    "value": "CZK",
    "label": "CZK - Czech Republic Koruna"
  },
  {
    "value": "DJF",
    "label": "DJF - Djiboutian Franc"
  },
  {
    "value": "DKK",
    "label": "DKK - Danish Krone"
  },
  {
    "value": "DOP",
    "label": "DOP - Dominican Peso"
  },
  {
    "value": "DZD",
    "label": "DZD - Algerian Dinar"
  },
  {
    "value": "EGP",
    "label": "EGP - Egyptian Pound"
  },
  {
    "value": "ERN",
    "label": "ERN - Eritrean Nakfa"
  },
  {
    "value": "ETB",
    "label": "ETB - Ethiopian Birr"
  },
  {
    "value": "EUR",
    "label": "EUR - Euro"
  },
  {
    "value": "FJD",
    "label": "FJD - Fijian Dollar"
  },
  {
    "value": "FKP",
    "label": "FKP - Falkland Islands Pound"
  },
  {
    "value": "FOK",
    "label": "FOK - Faroese Króna"
  },
  {
    "value": "GBP",
    "label": "GBP - British Pound Sterling"
  },
  {
    "value": "GEL",
    "label": "GEL - Georgian Lari"
  },
  {
    "value": "GGP",
    "label": "GGP - Guernsey Pound"
  },
  {
    "value": "GHS",
    "label": "GHS - Ghanaian Cedi"
  },
  {
    "value": "GIP",
    "label": "GIP - Gibraltar Pound"
  },
  {
    "value": "GMD",
    "label": "GMD - Gambian Dalasi"
  },
  {
    "value": "GNF",
    "label": "GNF - Guinean Franc"
  },
  {
    "value": "GTQ",
    "label": "GTQ - Guatemalan Quetzal"
  },
  {
    "value": "GYD",
    "label": "GYD - Guyanaese Dollar"
  },
  {
    "value": "HKD",
    "label": "HKD - Hong Kong Dollar"
  },
  {
    "value": "HNL",
    "label": "HNL - Honduran Lempira"
  },
  {
    "value": "HRK",
    "label": "HRK - Croatian Kuna"
  },
  {
    "value": "HTG",
    "label": "HTG - Haitian Gourde"
  },
  {
    "value": "HUF",
    "label": "HUF - Hungarian Forint"
  },
  {
    "value": "IDR",
    "label": "IDR - Indonesian Rupiah"
  },
  {
    "value": "ILS",
    "label": "ILS - Israeli New Sheqel"
  },
  {
    "value": "IMP",
    "label": "IMP - Isle of Man Pound"
  },
  {
    "value": "INR",
    "label": "INR - Indian Rupee"
  },
  {
    "value": "IQD",
    "label": "IQD - Iraqi Dinar"
  },
  {
    "value": "IRR",
    "label": "IRR - Iranian Rial"
  },
  {
    "value": "ISK",
    "label": "ISK - Icelandic Króna"
  },
  {
    "value": "JEP",
    "label": "JEP - Jersey Pound"
  },
  {
    "value": "JMD",
    "label": "JMD - Jamaican Dollar"
  },
  {
    "value": "JOD",
    "label": "JOD - Jordanian Dinar"
  },
  {
    "value": "JPY",
    "label": "JPY - Japanese Yen"
  },
  {
    "value": "KES",
    "label": "KES - Kenyan Shilling"
  },
  {
    "value": "KGS",
    "label": "KGS - Kyrgystani Som"
  },
  {
    "value": "KHR",
    "label": "KHR - Cambodian Riel"
  },
  {
    "value": "KID",
    "label": "KID - Kiribati Dollar"
  },
  {
    "value": "KRW",
    "label": "KRW - South Korean Won"
  },
  {
    "value": "KWD",
    "label": "KWD - Kuwaiti Dinar"
  },
  {
    "value": "KYD",
    "label": "KYD - Cayman Islands Dollar"
  },
  {
    "value": "KZT",
    "label": "KZT - Kazakhstani Tenge"
  },
  {
    "value": "LAK",
    "label": "LAK - Laotian Kip"
  },
  {
    "value": "LBP",
    "label": "LBP - Lebanese Pound"
  },
  {
    "value": "LKR",
    "label": "LKR - Sri Lankan Rupee"
  },
  {
    "value": "LRD",
    "label": "LRD - Liberian Dollar"
  },
  {
    "value": "LSL",
    "label": "LSL - Lesotho Loti"
  },
  {
    "value": "LYD",
    "label": "LYD - Libyan Dinar"
  },
  {
    "value": "MAD",
    "label": "MAD - Moroccan Dirham"
  },
  {
    "value": "MDL",
    "label": "MDL - Moldovan Leu"
  },
  {
    "value": "MGA",
    "label": "MGA - Malagasy Ariary"
  },
  {
    "value": "MKD",
    "label": "MKD - Macedonian Denar"
  },
  {
    "value": "MMK",
    "label": "MMK - Myanma Kyat"
  },
  {
    "value": "MNT",
    "label": "MNT - Mongolian Tugrik"
  },
  {
    "value": "MOP",
    "label": "MOP - Macanese Pataca"
  },
  {
    "value": "MRU",
    "label": "MRU - Mauritanian Ouguiya"
  },
  {
    "value": "MUR",
    "label": "MUR - Mauritian Rupee"
  },
  {
    "value": "MVR",
    "label": "MVR - Maldivian Rufiyaa"
  },
  {
    "value": "MWK",
    "label": "MWK - Malawian Kwacha"
  },
  {
    "value": "MXN",
    "label": "MXN - Mexican Peso"
  },
  {
    "value": "MYR",
    "label": "MYR - Malaysian Ringgit"
  },
  {
    "value": "MZN",
    "label": "MZN - Mozambican Metical"
  },
  {
    "value": "NAD",
    "label": "NAD - Namibian Dollar"
  },
  {
    "value": "NGN",
    "label": "NGN - Nigerian Naira"
  },
  {
    "value": "NIO",
    "label": "NIO - Nicaraguan Córdoba"
  },
  {
    "value": "NOK",
    "label": "NOK - Norwegian Krone"
  },
  {
    "value": "NPR",
    "label": "NPR - Nepalese Rupee"
  },
  {
    "value": "NZD",
    "label": "NZD - New Zealand Dollar"
  },
  {
    "value": "OMR",
    "label": "OMR - Omani Rial"
  },
  {
    "value": "PAB",
    "label": "PAB - Panamanian Balboa"
  },
  {
    "value": "PEN",
    "label": "PEN - Peruvian Nuevo Sol"
  },
  {
    "value": "PGK",
    "label": "PGK - Papua New Guinean Kina"
  },
  {
    "value": "PHP",
    "label": "PHP - Philippine Peso"
  },
  {
    "value": "PKR",
    "label": "PKR - Pakistani Rupee"
  },
  {
    "value": "PLN",
    "label": "PLN - Polish Złoty"
  },
  {
    "value": "PYG",
    "label": "PYG - Paraguayan Guarani"
  },
  {
    "value": "QAR",
    "label": "QAR - Qatari Rial"
  },
  {
    "value": "RON",
    "label": "RON - Romanian Leu"
  },
  {
    "value": "RSD",
    "label": "RSD - Serbian Dinar"
  },
  {
    "value": "RUB",
    "label": "RUB - Russian Ruble"
  },
  {
    "value": "RWF",
    "label": "RWF - Rwandan Franc"
  },
  {
    "value": "SAR",
    "label": "SAR - Saudi Riyal"
  },
  {
    "value": "SBD",
    "label": "SBD - Solomon Islands Dollar"
  },
  {
    "value": "SCR",
    "label": "SCR - Seychellois Rupee"
  },
  {
    "value": "SDG",
    "label": "SDG - Sudanese Pound"
  },
  {
    "value": "SEK",
    "label": "SEK - Swedish Krona"
  },
  {
    "value": "SGD",
    "label": "SGD - Singapore Dollar"
  },
  {
    "value": "SHP",
    "label": "SHP - Saint Helena Pound"
  },
  {
    "value": "SLL",
    "label": "SLL - Sierra Leonean Leone"
  },
  {
    "value": "SOS",
    "label": "SOS - Somali Shilling"
  },
  {
    "value": "SRD",
    "label": "SRD - Surinamese Dollar"
  },
  {
    "value": "SSP",
    "label": "SSP - South Sudanese Pound"
  },
  {
    "value": "STN",
    "label": "STN - São Tomé and Príncipe Dobra"
  },
  {
    "value": "SYP",
    "label": "SYP - Syrian Pound"
  },
  {
    "value": "SZL",
    "label": "SZL - Eswatini Lilangeni"
  },
  {
    "value": "THB",
    "label": "THB - Thai Baht"
  },
  {
    "value": "TJS",
    "label": "TJS - Tajikistani Somoni"
  },
  {
    "value": "TMT",
    "label": "TMT - Turkmenistani Manat"
  },
  {
    "value": "TND",
    "label": "TND - Tunisian Dinar"
  },
  {
    "value": "TOP",
    "label": "TOP - Tongan Pa'anga"
  },
  {
    "value": "TRY",
    "label": "TRY - Turkish Lira"
  },
  {
    "value": "TTD",
    "label": "TTD - Trinidad and Tobago Dollar"
  },
  {
    "value": "TWD",
    "label": "TWD - New Taiwan Dollar"
  },
  {
    "value": "TZS",
    "label": "TZS - Tanzanian Shilling"
  },
  {
    "value": "UAH",
    "label": "UAH - Ukrainian Hryvnia"
  },
  {
    "value": "UGX",
    "label": "UGX - Ugandan Shilling"
  },
  {
    "value": "USD",
    "label": "USD - United States Dollar"
  },
  {
    "value": "UYU",
    "label": "UYU - Uruguayan Peso"
  },
  {
    "value": "UZS",
    "label": "UZS - Uzbekistan Som"
  },
  {
    "value": "VES",
    "label": "VES - Venezuelan Bolívar"
  },
  {
    "value": "VND",
    "label": "VND - Vietnamese Dong"
  },
  {
    "value": "VUV",
    "label": "VUV - Vanuatu Vatu"
  },
  {
    "value": "WST",
    "label": "WST - Samoan Tala"
  },
  {
    "value": "XAF",
    "label": "XAF - Central African CFA Franc"
  },
  {
    "value": "XCD",
    "label": "XCD - East Caribbean Dollar"
  },
  {
    "value": "XOF",
    "label": "XOF - West African CFA Franc"
  }
]


const jobStatus = [
  { label: <div style={{ backgroundColor: "blue" }} className="text-white w-fit px-2  rounded-full">Pre Seed</div>, value: "Pre Seed" },
  { label: <div style={{ backgroundColor: "orange" }} className="text-white w-fit px-2  rounded-full">In Progress</div>, value: "In Progress" },
  { label: <div style={{ backgroundColor: "rgba(22, 160, 133, 1)" }} className="text-white w-fit px-2  rounded-full">Invoiced</div>, value: "Invoiced" },
  { label: <div style={{ backgroundColor: "rgba(46, 204, 113, 1)" }} className="text-white w-fit px-2  rounded-full">Partially Paid</div>, value: "Partially Paid" },
  { label: <div style={{ backgroundColor: "rgba(44, 62, 80, 1)" }} className="text-white w-fit px-2  rounded-full">Closed</div>, value: "Closed" },
  { label: <div style={{ backgroundColor: "rgba(169, 50, 38, 1)" }} className="text-white w-fit px-2  rounded-full">Canceled</div>, value: "Canceled" },
]

const jobStatusNotColored = [
  { label: "Pre Seed", value: "Pre Seed" },
  { label: "In Progress", value: "In Progress" },
  { label: "Invoiced", value: "Invoiced" },
  { label: "Partially Paid", value: "Partially Paid" },
  { label: "Closed", value: "Closed" },
  { label: "Canceled", value: "Canceled" },
]

const paymentTypes = [
  { label: "Cash", value: "Cash" },
  { label: "Cheque", value: "Cheque" },
  { label: "Bank Transfer", value: "Bank Transfer" },
  { label: "Money Transfer", value: "Money Transfer" },
  { label: "CLIQ", value: "CLIQ" },
  { label: "Paypal", value: "Paypal" },
  { label: "Stripe", value: "Stripe" },
  { label: "Crypto Currency", value: "Crypto Currency" },
  { label: "Bitcoin", value: "Bitcoin" },
  { label: "Ethereum", value: "Ethereum" },
]

const paymentColors = {
  "Cash": "rgba(46, 204, 113, 1)",
  "Cheque": "rgba(52, 152, 219, 1)",
  "Bank Transfer": "rgba(155, 89, 182, 1)",
  "Money Transfer": "rgba(241, 196, 15, 1)",
  "CLIQ": "rgba(231, 76, 60, 1)",
  "Paypal": "rgba(44, 62, 80, 1)",
  "Stripe": "rgba(127, 140, 141, 1)",
  "Crypto Currency": "rgba(22, 160, 133, 1)",
  "Bitcoin": "rgba(243, 156, 18, 1)",
  "Ethereum": "rgba(169, 50, 38, 1)"
};

const categoryColors = {
  "Advertising/Marketing": "#FF5733",
  "Banking Fees": "#E74C3C",
  "Bonus/Gifts": "#F1C40F",
  "Business Insurance": "#3498DB",
  "Business meetings": "#F39C12",
  "Consulting Fees": "#E67E22",
  "Courses/Education": "#839192",
  "Design/Designer": "#3498DB",
  "Electronics": "#1ABC9C",
  "Employee Benefits": "#16A085",
  "Freelancing job": "#2ECC71",
  "Hosting": "#27AE60",
  "Insurance/Health insurance": "#2E86C1",
  "Interest fees": "#2980B9",
  "Internet bill": "#3498DB",
  "Legal Fees": "#2980B9",
  "Mailing services": "#5D6D7E",
  "Maintenance/Repairs": "#1F618D",
  "Office equipment": "#1F618D",
  "Office Rent": "#1F618D",
  "Office supplies": "#1ABC9C",
  "Payroll/Salary": "#F1C40F",
  "Rent/Accommodation": "#F39C12",
  "Servers": "#FF5733",
  "Software Subscriptions": "#F7DC6F",
  "Storage/Cloud storage": "#1ABC9C",
  "Tax/Federal tax": "#3498DB",
  "Training and Development": "#5499C7",
  "Transportation": "#1ABC9C",
  "Travel": "#3498DB",
  "Utility bills": "#2E86C1",
  "Website Development": "#F4D03F"
};



const expenseCategory = [
  {
    label: "Advertising/Marketing",
    value: "Advertising/Marketing",
  },
  { label: "Banking Fees", value: "Banking Fees" },
  { label: "Bonus/Gifts", value: "Bonus/Gifts" },
  { label: "Business Insurance", value: "Business Insurance" },
  { label: "Business meetings", value: "Business meetings" },
  { label: "Consulting Fees", value: "Consulting Fees" },
  { label: "Courses/Education", value: "Courses/Education" },
  { label: "Design/Designer", value: "Design/Designer" },
  { label: "Electronics", value: "Electronics" },
  { label: "Employee Benefits", value: "Employee Benefits" },
  { label: "Freelancing job", value: "Freelancing job" },
  { label: "Hosting", value: "Hosting" },
  {
    label: "Insurance/Health insurance",
    value: "Insurance/Health insurance",
  },
  { label: "Interest fees", value: "Interest fees" },
  { label: "Internet bill", value: "Internet bill" },
  { label: "Legal Fees", value: "Legal Fees" },
  { label: "Mailing services", value: "Mailing services" },
  { label: "Maintenance/Repairs", value: "Maintenance/Repairs" },
  { label: "Office equipment", value: "Office equipment" },
  { label: "Office Rent", value: "Office Rent" },
  { label: "Office supplies", value: "Office supplies" },
  { label: "Payroll/Salary", value: "Payroll/Salary" },
  { label: "Rent/Accommodation", value: "Rent/Accommodation" },
  { label: "Servers", value: "Servers" },
  {
    label: "Software Subscriptions",
    value: "Software Subscriptions",
  },
  {
    label: "Storage/Cloud storage",
    value: "Storage/Cloud storage",
  },
  { label: "Tax/Federal tax", value: "Tax/Federal tax" },
  {
    label: "Training and Development",
    value: "Training and Development",
  },
  { label: "Transportation", value: "Transportation" },
  { label: "Travel", value: "Travel" },
  { label: "Utility bills", value: "Utility bills" },
  { label: "Website Development", value: "Website Development" },
]

const redirect = (url) => {
  window.location.href = url;
};
import secureLocalStorage from "react-secure-storage";
import NextCrypto from "next-crypto";
const login = async (data, setLoading) => {
  setLoading(true)
  NotificationLoading();
  const URL = `${process.env.DIGITALOCEAN}/api/token/`;
  axios
    .post(URL, data)
    .then(async (res) => {
      setLoading(false)

      clearStorageCookies()
      cookie.save("AccessTokenSBS", res?.data?.access, {
        path: "/",
      });
      cookie.save("userImage", res?.data?.userImage, {
        path: "/",
      });
      cookie.save("userFullname", res?.data?.userFullname, {
        path: "/",
      });
      cookie.save("company", res?.data?.company, {
        path: "/",
      });
      cookie.save("RefreshTokenSBS", res?.data?.refresh, {
        path: "/",
      });
      cookie.save("userPermission", res?.data?.permission, {
        path: "/",
      });
      cookie.save("username", res?.data?.username, {
        path: "/",
      });
      cookie.save("userId", res?.data?.id, {
        path: "/",
      });

      secureLocalStorage.setItem("plan", res?.data?.plan);
      secureLocalStorage.setItem("storage", res?.data?.storage);
      secureLocalStorage.setItem("maxStorage", res?.data?.maxStorage);

      if (!res?.data?.companyPreferences || !res?.data?.companyCurrency) {
        setLoading(false)
        redirect("/authorized/new-company");
      } else {
        cookie.save("companyPreferences", res?.data?.companyPreferences, {
          path: "/",
        });
        secureLocalStorage.setItem("companyPreferences", JSON.stringify(res?.data?.companyPreferencesObj));
        cookie.save("companyCurrency", res?.data?.companyCurrency, {
          path: "/",
        });
        setLoading(false)
        redirect("/authorized/dashboard");
      }
      setLoading(false)
      NotificationSuccess();
    })
    .catch((err) => {
      setLoading(false)
      handleError(err)
    });
};

const signup = async (data, setIsLoading) => {
  try {
    setIsLoading(true);
    NotificationLoading();
    let res = await axios.post(`${process.env.DIGITALOCEAN}/company/`, data);
    NotificationSuccess(res.data.success);
    return res.data;
  } catch (err) {
    handleError(err);
  }
  setIsLoading(false);

};

const logout = async () => {
  clearStorageCookies()
  redirect("/");
};

const clearStorageCookies = () => {
  remove("selectedTab", { path: "/" });
  remove("userId", { path: "/" });
  remove("company", { path: "/" });
  remove("username", { path: "/" });
  remove("RefreshTokenSBS", { path: "/" });
  remove("userFullname", { path: "/" });
  remove("AccessTokenSBS", { path: "/" });
  remove("userImage", { path: "/" });
  remove("userPermission", { path: "/" });
  remove("companyCurrency", { path: "/" });
  remove("companyPreferences", { path: "/" });
  remove("accessToken", { path: "/" });
  remove("invited-email", { path: "/" });
  remove("invited-project", { path: "/" });
  localStorage.clear();
  secureLocalStorage.clear();
}

const saveToLocal = (key, value) => {
  secureLocalStorage.setItem(key, JSON.stringify(value));
};

const getObjectsFromLocalStorage = (key) => {
  let localStorageCheck = secureLocalStorage?.getItem(key) || null;
  if (localStorageCheck) {
    return JSON?.parse(secureLocalStorage?.getItem(key) || {});
  }
  return null;
};


const getColumnSearchProps = (dataIndex, searchInput, searchedColumn, searchText, handleSearch, handleReset, setSearchText, setSearchedColumn) => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    close,
  }) => (
    <div
      style={{
        padding: 8,
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{
          marginBottom: 8,
          display: "block",
        }}
      />
      <Space>
        <Button
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          type="primary"
          className="bg-blue-500 hover:bg-blue-600"
          size="small"
          style={{
            width: 90,
            paddingBottom: 20,
          }}
        >
          <div className="flex gap-x-2 items-center justify-center">
            <SearchOutlined /> Search
          </div>
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{
            width: 90,
          }}
          type="primary"
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({
              closeDropdown: false,
            });
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
          }}
        >
          Filter
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close();
          }}
        >
          close
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined
      style={{
        color: filtered ? "#1677ff" : undefined,
      }}
    />
  ),
  onFilter: (value, record) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownOpenChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  render: (text) =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{
          backgroundColor: "#ffc069",
          padding: 0,
        }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    ) : (
      text
    ),
});



export {
  redirect,
  login,
  signup,
  logout,
  saveToLocal,
  getObjectsFromLocalStorage,
  getColumnSearchProps,
  timeZones,
  jobcategories,
  jobStatus,
  currencies,
  paymentTypes,
  paymentColors,
  categoryColors,
  expenseCategory,
  jobStatusNotColored,
  jobCat
};
