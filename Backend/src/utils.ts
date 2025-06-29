import { randomBytes } from "crypto";

export const generateHash = (length: number = 20): string => {
    return randomBytes(length).toString("hex").slice(0, length);
  };

export function random(len: number){
    let options = "qwertyuiopasdfghjklzxcvbnm1234567890<>";
    let length = options.length;
    let ans = "";
    for(let i= 0; i<len;i++){
        ans += options[Math.floor((Math.random() * length))]
    }
    return ans;
}