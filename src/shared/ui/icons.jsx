import {
  ArrowRight,
  Atom,
  Bot,
  BrainCircuit,
  ChartColumnIncreasing,
  ClipboardList,
  Compass,
  Database,
  DraftingCompass,
  Gauge,
  Gem,
  Hammer,
  Home,
  Leaf,
  MessageCircle,
  PenTool,
  Rocket,
  Satellite,
  ScanLine,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Smartphone,
  X,
  UserRound,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react'

const iconProps = {
  'aria-hidden': true,
  strokeWidth: 1.7,
  vectorEffect: 'non-scaling-stroke',
}

function Icon({ as: Component, className, size = 24 }) {
  return <Component {...iconProps} className={className} size={size} />
}

export function ArrowIcon({ diagonal = false }) {
  return <Icon as={ArrowRight} size={20} className={diagonal ? 'icon-arrow icon-arrow--diagonal' : 'icon-arrow'} />
}

export function SearchIcon() {
  return <Icon as={Search} size={24} />
}

export function PhoneIcon() {
  return <Icon as={Smartphone} size={24} />
}

export function HomeIcon() {
  return <Icon as={Home} size={24} />
}

export function PlannerIcon() {
  return <Icon as={ClipboardList} size={24} />
}

export function HabitsIcon() {
  return <Icon as={Leaf} size={24} />
}

export function UserIcon() {
  return <Icon as={UserRound} size={24} />
}

export function TechGlyph({ type }) {
  const icons = {
    neural: BrainCircuit,
    orbit: Atom,
    rocket: Rocket,
    robot: Bot,
    energy: Zap,
    shield: ShieldCheck,
    crystal: Gem,
    beam: Satellite,
  }
  return <Icon as={icons[type] || ScanLine} className="tech-glyph" size={64} />
}

export function PathwayGlyph({ type }) {
  const icons = {
    builder: Hammer,
    explorer: Compass,
    analyst: ChartColumnIncreasing,
    creator: PenTool,
  }
  return <Icon as={icons[type] || DraftingCompass} className="pathway-glyph" size={64} />
}

export function SoundIcon({ muted }) {
  return <Icon as={muted ? VolumeX : Volume2} size={24} />
}

export function StatGlyph({ type }) {
  const icons = {
    data: Database,
    speed: Gauge,
    bolt: Zap,
  }
  return <Icon as={icons[type] || ScanLine} className="stat-glyph" size={54} />
}

export function ChatIcon() {
  return <Icon as={MessageCircle} size={24} />
}

export function SparkIcon() {
  return <Icon as={Sparkles} size={24} />
}

export function SendIcon() {
  return <Icon as={Send} size={24} />
}

export function CloseIcon() {
  return <Icon as={X} size={24} />
}
