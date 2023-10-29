/**
 *
 * ISCORE: Identity language (raza, religión, género, orientación, discapacidad, hate...)
 * SSCORE: Sexually explicit language (palabras de tipo sexual, partes íntimas...)
 * ASCORE: Aggressive language (hostilidad, bullying...)
 * PSCORE: Profanity (lenguaje vulgar, útil para mantener un chat family-friendly)
 */

type ScoreFlagType = "ISCORE" | "SSCORE" | "ASCORE" | "PSCORE";

interface ScoreType {
  flag: ScoreFlagType,
  level: number
}

interface FlagFragmentType {
  messageFragment: string,
  scoreList: Array<ScoreType>
}

export type FlagsType = FlagFragmentType | Object;

export const parseFlags = (fields) : FlagsType => {
  const { flags, rawMessage } = fields;
  // No hay flags en el mensaje
  if (!flags) {
    return {};
  }

  // eslint-disable-next-line
  const flagData = flags.split(",")
    .map(field => field.split(":"))
    .map(([range, list]) : FlagFragmentType => {
      const [start, end] = range.split("-");
      const categories = list.split("/") ?? [];
      const messageFragment = rawMessage.substring(start, end + 1);
      const scoreList = categories.map((score) : ScoreType => {
        const [flag, level] = score.split(".");
        return { flag, level: Number(level) };
      });
      return { messageFragment, scoreList };
    });

  // flags && console.log(flagData.map(data => `${Object.keys(data)} => ${Object.values(data)}`));
  // flags && console.log(flagData);

  return flagData;
};
