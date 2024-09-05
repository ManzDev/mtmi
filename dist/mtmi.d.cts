/**
 * El streamer o un moderador ha baneado permanentemente (permaban) a un usuario.
 */
interface BanInfoType {
    type: string;
    /** roomId - Identificación numérica del canal en cuestión. */
    roomId: number;
    /** targetUserId -  */
    targetUserId: number;
    /** tmi - Timestamp del momento en que ocurre el evento. */
    tmi: number;
    channel: string;
    username: string;
    raw: any;
}

interface TimeoutInfoType extends BanInfoType {
    type: string;
    banDuration: number;
}

type ClearChatType = "clearchat" | "timeout" | "ban";
/**
 * El streamer o un moderador ha borrado todos los mensajes del canal
 */
interface ClearChatInfoType {
    /** type - El tipo de evento, "clearchat" en este caso. */
    type: ClearChatType;
    /** roomId - Identificación numérica del canal en cuestión. */
    roomId: number;
    /** tmi - Timestamp del momento en que ocurre el evento. */
    tmi: number;
    /** raw - Información cruda del evento, directamente desde Twitch. */
    raw: string;
}

interface ClearMsgInfoType {
    username: string;
    roomId: number;
    type: string;
    tmi: number;
    channel: string;
    message: string;
}

interface RoomStateInfoType {
    type: string;
    emoteOnly: boolean;
    followersOnly: number;
    r9k: boolean;
    roomId: number;
    slow: number;
    subsOnly: boolean;
    channel: string;
}

interface AnnouncementInfoType {
    color: string;
    roomId: number;
    systemMsg: string;
}

interface SubPlanType {
    planName: string;
    plan: string;
    isPrime: boolean;
    isTier1: boolean;
    isTier2: boolean;
    isTier3: boolean;
}

interface SubInfoType {
    cumulativeMonths: number;
    months: number;
    multimonthDuration: number;
    multimonthTenure: number;
    shouldShareStreak: boolean;
    streakMonths: number;
    subPlan: SubPlanType;
    wasGifted: boolean;
    systemMsg: string;
}

interface ReplyParentType {
    displayName: String;
    msgBody: String;
    msgId: String;
    userId: Number;
    userLogin: String;
}
interface ReplyThreadType {
    parentMsgId: String;
    parentUserLogin: String;
}
interface ReplyType extends ReplyParentType, ReplyThreadType {
    type: string;
}
type ReplyInfoType = ReplyType | object;

type ColorType = "#ff0000" | "#0000ff" | "#008000" | "#b22222" | "#ff7f50" | "#9acd32" | "#ff4500" | "#2e8b57" | "#daa520" | "#d2691e" | "#5f9ea0" | "#1e90ff" | "#ff69b4" | "#8a2be2" | "#00ff7f";
type PremiumColorType = string;

interface UserInfoType {
    username: string;
    displayName: string;
    color: ColorType | PremiumColorType;
    isVip: boolean;
    isMod: boolean;
    isSub: boolean;
    isTurbo: boolean;
    isPrime: boolean;
    isBot: boolean;
}

/**
 *
 * ISCORE: Identity language (raza, religión, género, orientación, discapacidad, hate...)
 * SSCORE: Sexually explicit language (palabras de tipo sexual, partes íntimas...)
 * ASCORE: Aggressive language (hostilidad, bullying...)
 * PSCORE: Profanity (lenguaje vulgar, útil para mantener un chat family-friendly)
 */
type ScoreFlagType = "ISCORE" | "SSCORE" | "ASCORE" | "PSCORE";
interface ScoreType {
    flag: ScoreFlagType;
    level: number;
}
interface FlagFragmentType {
    messageFragment: string;
    scoreList: Array<ScoreType>;
}
type FlagsType = FlagFragmentType | Object;

interface MessageInfoType {
    id: string;
    isFirstMessage: boolean;
    isReturningChatter: boolean;
    isEmoteOnly: boolean;
    isHighlightedMessage: boolean;
    isGigantifiedEmoteMessage: boolean;
    isAnimatedMessage: boolean;
    flagsInfo?: FlagsType;
    roomId: number;
    userId: number;
    tmi: number;
    msgId: string;
    message: HTMLSpanElement;
    rawMessage: string;
}

interface BitsInfoType {
    bits: number;
}
type BitsGroupType = BitsInfoType | object;

/**
 * Badges que el usuario tiene visibles en el chat.
 */
interface BadgeInfoType {
    /** Nombre del badge. */
    name: string;
    /** Valor asociado al badge. */
    value: number;
    /** Imagen identificativa del badge. */
    image: string;
    /** Descripción del badge. */
    description: string;
    /** Número completo de meses. */
    fullMonths?: number;
    /** Número del fundador. */
    founderNumber?: number;
    /** El usuario ha votado una predicción. */
    predictionInfo?: string;
}

interface UserMessageInfoType {
    type: string;
    username: string;
    channel: string;
    message: string;
    badges: Array<BadgeInfoType>;
    userInfo: UserInfoType;
    messageInfo: MessageInfoType;
    replyInfo?: ReplyInfoType;
    bitsInfo?: BitsGroupType;
    raw: string;
}

type JoinPartType = "join" | "part";
/**
 * Información del evento de entrada de un usuario.
 */
interface JoinPartInfoType {
    /** Evento de entrada (join) o de salida (part). */
    type: JoinPartType;
    /** Nombre de usuario de la persona. */
    username: string;
    /** Canal en el que ha interactuado el usuario. */
    channel: string;
    /** Información cruda como llega del servidor */
    raw: string;
}

type NoticeGroupType = "emote_only_off" | "emote_only_on" | "followers_on" | "followers_off" | "slow_on" | "slow_off" | "subs_on" | "subs_off" | "r9k_on" | "r9k_off";

interface RaidInfoType {
    displayName: string;
    username: string;
    profileImageURL: string;
    viewerCount: number;
}

interface MysteryGiftInfoType {
    massGiftCount: number;
    originId: string;
    isAnonymous: boolean;
    senderUsername: string;
    subPlan: string;
    systemMsg: string;
    senderCount?: number;
}

interface StandardPayforwardInfoType {
    gifterAnonymous: boolean;
    gifterId: number;
    gifterUserName: string;
    gifterDisplayName: string;
    recipientId: number;
    recipientUserName: string;
    recipientDisplayName: string;
    systemMsg: string;
}

interface CommunityPayforwardInfoType {
    gifterAnonymous: boolean;
    gifterId: number;
    gifterUserName: string;
    gifterDisplayName: string;
    systemMsg: string;
}

interface GiftPaidUpgradeInfoType {
    type: string;
    senderUsername: string;
    senderDisplayName: string;
    systemMsg: string;
    username: string;
    displayName: string;
}

interface PrimePaidUpgradeInfoType {
    type: string;
    username: string;
    displayName: string;
    subPlan: string;
    systemMsg: string;
}

interface GoalInfoType {
    contributionType: string;
    currentContributions: number;
    description: string;
    targetContributions: number;
    userContributions: number;
}
type GoalGroupType = GoalInfoType | object;

interface GiftInfoType {
    giftMonths: number;
    months: number;
    originId: string;
    isAnonymous: boolean;
    gifterUserName: string;
    gifterDisplayName: string;
    recipientDisplayName: string;
    recipientId: number;
    recipientUserName: string;
    subPlan: SubPlanType;
    systemMsg: string;
    senderCount?: number;
    funString?: string;
    goalInfo?: GoalGroupType;
}

interface ViewerMilestoneType {
    category: string;
    copoReward: number;
    value: number;
    systemMsg: string;
}

/**
 * Tipos de eventos de Twitch que puedes escuchar
 */
type EventTypeMap = {
    "clearchat": ClearChatInfoType;
    "ban": BanInfoType;
    "timeout": TimeoutInfoType;
    "clearmsg": ClearMsgInfoType;
    "sub": SubInfoType;
    "resub": SubInfoType;
    "raid": RaidInfoType;
    "join": JoinPartInfoType;
    "part": JoinPartInfoType;
    "submysterygift": MysteryGiftInfoType;
    "communitypayforward": CommunityPayforwardInfoType;
    "standardpayforward": StandardPayforwardInfoType;
    "primepaidupgrade": PrimePaidUpgradeInfoType;
    "giftpaidupgrade": GiftPaidUpgradeInfoType;
    "subgift": GiftInfoType;
    "roomstate": RoomStateInfoType;
    "announcement": AnnouncementInfoType;
    /** Un usuario ha escrito un mensaje en el canal */
    "message": UserMessageInfoType;
    "action": UserMessageInfoType;
    "bits": BitsInfoType;
    "raw": object;
    "emote_only_on": NoticeGroupType;
    "emote_only_off": NoticeGroupType;
    "followers_on": NoticeGroupType;
    "followers_off": NoticeGroupType;
    "slow_on": NoticeGroupType;
    "slow_off": NoticeGroupType;
    "subs_on": NoticeGroupType;
    "subs_off": NoticeGroupType;
    "r9k_on": NoticeGroupType;
    "r9k_off": NoticeGroupType;
    "viewermilestone": ViewerMilestoneType;
};

interface OptionsObject {
    channels: Array<String>;
}
interface OnParametersType<T extends keyof EventTypeMap> {
    type: T;
    action: (data: EventTypeMap[T]) => void;
}
declare class Client {
    #private;
    channels: Array<String>;
    client: WebSocket | undefined;
    startTime: Number | undefined;
    events: Array<OnParametersType<any>>;
    done: boolean;
    options: OptionsObject | undefined;
    connect(options: OptionsObject): void;
    on<T extends keyof EventTypeMap>(type: T, action: (data: EventTypeMap[T]) => void): void;
    pong(): void;
    close(): void;
}
declare const client: Client;

export { client };
