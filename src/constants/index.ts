import { IAward, TAwardName, TRank, TWidgetNames } from '@/types';

export const WIDGETS = [
  'editor',
  'main_image',
  'status_selector',
  'rank_selector',
  'awards',
] as const;

export const STATUSES = {
  '200': {
    code: '200',
    description: 'Killed in action',
    icon: 'skull',
    color: 'red',
  },
  '300': {
    code: '300',
    description: 'Wounded in action',
    icon: 'bandage',
    color: 'orange',
  },
  '400': {
    code: '400',
    description: 'Concussion or non-penetrating injury',
    icon: 'ambulance',
    color: 'yellow',
  },
  '500': {
    code: '500',
    description: 'Refusal to carry out orders',
    icon: 'ambulance',
    color: 'gray',
  },
  '600': {
    code: '600',
    description: 'Missing in action',
    icon: 'ambulance',
    color: 'red',
  },
  '700': {
    code: '700',
    description: 'Evacuation required or in progress',
    icon: 'ambulance',
    color: 'red',
  },
  '800': {
    code: '800',
    description: 'Active duty, combat ready',
    icon: 'shield',
    color: 'green',
  },
} as const;

export const RANKS = [
  // Privates
  'Recruit',
  'Private',
  'Senior Private',

  // NCOs
  'Junior Sergeant ★',
  'Sergeant ★★',
  'Senior Sergeant ★★★',
  'Chief Sergeant ★★★★',
  'Staff Sergeant ★★★★★',
  'Master Sergeant ★★★★★★',
  'Senior Master Sergeant ★★★★★★★',
  'Chief Master Sergeant ★★★★★★★★',

  // Junior Officers
  'Junior Lieutenant ★',
  'Lieutenant ★★',
  'Senior Lieutenant ★★★',
  'Captain ★★★★',

  // Senior Officers
  'Major ★',
  'Lieutenant Colonel ★★',
  'Colonel ★★★',

  // Generals
  'Brigadier General ★',
  'Major General ★★',
  'Lieutenant General ★★★',
  'General ★★★★',
] as const;

export const AWARDS = [
  // 🇺🇦 ДЕРЖАВНІ
  {
    name: 'HeroOfUkraine',
    title: 'Hero of Ukraine',
    description: 'The highest national title awarded for exceptional heroism.',
    icon: '🌟',
    category: 'State',
  },
  {
    name: 'OrderGoldenStar',
    title: 'Order “Golden Star”',
    description: 'Awarded along with the Hero of Ukraine title.',
    icon: '⭐',
    category: 'State',
  },
  {
    name: 'OrderForCourageI',
    title: 'Order For Courage I',
    description:
      'Highest degree of bravery award for exceptional acts of courage.',
    icon: '🟦',
    category: 'State',
  },
  {
    name: 'OrderForCourageII',
    title: 'Order For Courage II',
    description: 'Second degree award for bravery and personal courage.',
    icon: '🟩',
    category: 'State',
  },
  {
    name: 'OrderForCourageIII',
    title: 'Order For Courage III',
    description: 'Third degree award for significant heroic acts.',
    icon: '🟪',
    category: 'State',
  },
  {
    name: 'OrderOfBohdanKhmelnytskyI',
    title: 'Order of Bohdan Khmelnytsky I',
    description: 'Highest degree award for leadership and defense of Ukraine.',
    icon: '⚔️',
    category: 'State',
  },
  {
    name: 'OrderOfBohdanKhmelnytskyII',
    title: 'Order of Bohdan Khmelnytsky II',
    description: 'Second degree award for excellent military achievements.',
    icon: '🛡️',
    category: 'State',
  },
  {
    name: 'OrderOfBohdanKhmelnytskyIII',
    title: 'Order of Bohdan Khmelnytsky III',
    description: 'Awarded for significant contributions to defense.',
    icon: '🟫',
    category: 'State',
  },
  {
    name: 'OrderDanyloHalytsky',
    title: 'Order of Danylo Halytsky',
    description: 'Awarded for high-quality service and strengthening defense.',
    icon: '🏅',
    category: 'State',
  },
  {
    name: 'MedalForMilitaryService',
    title: 'Medal “For Military Service to Ukraine”',
    description: 'Awarded for outstanding military duty performance.',
    icon: '🎖️',
    category: 'State',
  },
  {
    name: 'MedalDefenderOfFatherland',
    title: 'Medal “Defender of the Fatherland”',
    description:
      'Awarded to soldiers who defended independence and sovereignty.',
    icon: '🟡',
    category: 'State',
  },

  // 🟦 МОУ
  {
    name: 'MOUDistinctionForWoundI',
    title: 'MOU Distinction for Wound I',
    description: 'Awarded for wounds sustained in battle (1st class).',
    icon: '💔',
    category: 'MOD',
  },
  {
    name: 'MOUDistinctionForWoundII',
    title: 'MOU Distinction for Wound II',
    description: 'Awarded for wounds sustained in battle (2nd class).',
    icon: '❤️‍🩹',
    category: 'MOD',
  },
  {
    name: 'MOUForExemplaryService',
    title: 'MOU Medal “For Exemplary Service”',
    description: 'Awarded for disciplined and outstanding duty.',
    icon: '🔰',
    category: 'MOD',
  },
  {
    name: 'MOUForDefenseOfUkraine',
    title: 'MOU Medal “For Defense of Ukraine”',
    description: 'Awarded for participation in defending the country.',
    icon: '🛡️',
    category: 'MOD',
  },
  {
    name: 'MOUForStrengtheningDefense',
    title: 'MOU Medal “For Strengthening Defense Capability”',
    description: 'Awarded for contributions to Ukraine’s defense systems.',
    icon: '🏗️',
    category: 'MOD',
  },
  {
    name: 'MOUForPeacekeeping',
    title: 'MOU Medal “For Peacekeeping Service”',
    description: 'Awarded to peacekeeping mission participants.',
    icon: '🕊️',
    category: 'MOD',
  },

  // 🟥 ГЕНШТАБ
  {
    name: 'GSCParticipantOOS',
    title: 'GSC Participant of OOS',
    description: 'Awarded for participation in the Joint Forces Operation.',
    icon: '⚙️',
    category: 'GeneralStaff',
  },
  {
    name: 'GSCForDiligentService',
    title: 'GSC Distinction “For Diligent Service”',
    description: 'For discipline, professionalism, and long service.',
    icon: '🔵',
    category: 'GeneralStaff',
  },
  {
    name: 'GSCBestWarrior',
    title: 'GSC Badge “Best Warrior”',
    description: 'Award for excellence in military performance.',
    icon: '🔥',
    category: 'GeneralStaff',
  },

  // 🟩 КОМАНДУВАННЯ
  {
    name: 'ArmyLandForCourage',
    title: 'Land Forces “For Courage”',
    description: 'Awarded for bravery in Land Forces operations.',
    icon: '🌲',
    category: 'Command',
  },
  {
    name: 'AirForceService',
    title: 'Air Force Service Medal',
    description: 'Award for outstanding service in the Air Force.',
    icon: '✈️',
    category: 'Command',
  },
  {
    name: 'NavyService',
    title: 'Navy Service Medal',
    description: 'Award for accomplishments in naval operations.',
    icon: '⚓',
    category: 'Command',
  },

  // 🟨 ЧАСТИН
  {
    name: 'UnitBadge',
    title: 'Unit / Brigade Badge',
    description: 'Insignia awarded by brigades, battalions, or units.',
    icon: '🎗️',
    category: 'Unit',
  },
] as const;

export const AWARDSNAMES = AWARDS.map((award) => award.name);

export const UNIT_TYPES = {
  BRIGADE: 'brigade',
  BATTALION: 'battalion',
  COMPANY: 'company',
  PLATOON: 'platoon',
  SQUAD: 'squad',
  STAFF: 'staff',
  SECTION: 'section',
} as const;

export const ASSIGNMENT_ROLES = {
  BRIGADE_COMMANDER: 'brigade_commander',
  DEPUTY_COMMANDER: 'deputy_commander',
  CHIEF_OF_STAFF: 'chief_of_staff',

  BATTALION_COMMANDER: 'battalion_commander',
  COMPANY_COMMANDER: 'company_commander',
  PLATOON_COMMANDER: 'platoon_commander',
  SQUAD_LEADER: 'squad_leader',

  SOLDIER: 'soldier',
} as const;

export const sideBarLinks = [
  { url: '/overview', text: 'Overview' },
  { url: '/orders', text: 'Orders' },
  { url: '/reports', text: 'Reports' },
  { url: '/settings', text: 'Settings' },
] as const;
