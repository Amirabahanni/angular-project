import { Injectable } from '@angular/core';
import OpenAI from 'openai'; // Import OpenAI correctly

@Injectable({
  providedIn: 'root',
})
export class LangchainService {
  private openai: OpenAI;
  private requestCount: number = 0; // Counter for API requests
  private lastRequestTime: number = Date.now(); // Timestamp of the last request

  constructor() {
    this.openai = new OpenAI({
      apiKey: 'sk-svcacct-wNSQMt_s5vMnkOVme8CtlCKt1MUtqe4Bec6gffwKzcblc_IUtCA5PgC-YYk78VVT3BlbkFJerB525CVajlxAkXF6f9UKgmRZ1VvnjL2ih_hgTf9zmifJDRhC6CvsHmTJahNi9wA',
      dangerouslyAllowBrowser: true,
    });
  }

  private async throttleRequest(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    const requestInterval = 60000; // 60 seconds interval for rate limiting

    if (this.requestCount >= 3) {
      if (timeSinceLastRequest < requestInterval) {
        const delay = requestInterval - timeSinceLastRequest;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
      this.requestCount = 0; // Reset counter after waiting
    }

    this.requestCount++;
    this.lastRequestTime = Date.now();
  }

  async analyzeHeartbeatData(heartbeatData: number[]): Promise<string> {
    const last30Data = heartbeatData.slice(-30);

    const analysisPrompt = `
      You are a doctor analyzing a patient's heart rate data. 
      Please provide a detailed analysis based on the following data:
      ${last30Data.join(', ')}
    `;

    try {
      await this.throttleRequest(); // Call the throttle function before making the API request

      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: analysisPrompt }],
      });

      return response.choices[0]?.message.content || 'No content returned.';
    } catch (error) {
      // Safely cast the error to an instance of Error or handle as unknown
      if (error instanceof Error) {
        if (error.message.includes('too many requests')) {
          return 'Too many requests. Please try again later.';
        }
        return `An error occurred: ${error.message}`;
      } else {
        console.error('Unknown error:', error); // Handle unknown type safely
        return 'An unknown error occurred while analyzing data.';
      }
    }
  }
}
