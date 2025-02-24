import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

function getLetterFromCommitNumber(commitNumber) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const index = (parseInt(commitNumber) - 1) % 26;
  return alphabet[index];
}

export async function GET() {
  try {
    const { stdout: fullDate } = await execAsync('git log -1 --format="%ad" --date=format:"%Y-%m-%d %H:%M:%S"');
    const { stdout: commitNumber } = await execAsync('git rev-list --count HEAD');

    const [datePart, timePart] = fullDate.trim().split(' ');
    const [year, month, day] = datePart.split('-');
    
    const trimmedCommitNumber = commitNumber.trim();
    const revLetter = getLetterFromCommitNumber(trimmedCommitNumber);

    return Response.json({
      year: year,
      month: month,
      day: day,
      time: timePart,
      commitNumber: trimmedCommitNumber,
      commitRev: revLetter
    });
  } catch (error) {
    return Response.json({ error: "Failed to retrieve git info" }, { status: 500 });
  }
}