import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';
import { LangchainService } from 'C:\\Users\\Dell\\Desktop\\final acti-sens\\actisens\\src\\app\\langchain.service'; // Assume you have a service to handle Langchain.js operations
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private ecgData: number[] = [];
  private svg: any;
  private width = 600;
  private height = 200;
  private margin = { top: 10, right: 30, bottom: 30, left: 50 };
  
  heartRate: number = 75;
  avgHeartbeat: number = 72;
  maxHeartbeat: number = 120;
  minHeartbeat: number = 60;
  
  aiResponse: string | null = null; // Define the aiResponse property
  analysisResult: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private langchainService: LangchainService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createSvg();
      this.generateEcgData();
      this.drawEcgChart();
      this.updateChart();
      this.updateMetrics();
    }
  }

  private createSvg(): void {
    this.svg = d3.select('div#ecg')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  private generateEcgData(): void {
    for (let i = 0; i < 100; i++) {
      this.ecgData.push(Math.sin(i / 10) * 50 + Math.random() * 10);
    }
  }

  private drawEcgChart(): void {
    const x = d3.scaleLinear()
      .domain([0, this.ecgData.length - 1])
      .range([0, this.width]);

    const y = d3.scaleLinear()
      .domain([d3.min(this.ecgData) || 0, d3.max(this.ecgData) || 0])
      .range([this.height, 0]);

    this.svg.append('g')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));

    this.svg.append('g')
      .call(d3.axisLeft(y));

    this.svg.append('path')
      .datum(this.ecgData)
      .attr('fill', 'none')
      .attr('stroke', '#007bff')
      .attr('stroke-width', 2)
      .attr('d', d3.line<number>()
        .x((_: any, i: number) => x(i))
        .y((d: number) => y(d)));
  }

  private updateChart(): void {
    setInterval(() => {
      this.ecgData.shift();
      this.ecgData.push(Math.sin(this.ecgData.length / 10) * 50 + Math.random() * 10);

      const x = d3.scaleLinear()
        .domain([0, this.ecgData.length - 1])
        .range([0, this.width]);

      const y = d3.scaleLinear()
        .domain([d3.min(this.ecgData) || 0, d3.max(this.ecgData) || 0])
        .range([this.height, 0]);

      this.svg.selectAll('path')
        .datum(this.ecgData)
        .attr('d', d3.line<number>()
          .x((_: any, i: number) => x(i))
          .y((d: number) => y(d)));
    }, 1000);
  }

  private updateMetrics(): void {
    setInterval(() => {
      this.heartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
      this.avgHeartbeat = Math.floor(Math.random() * (85 - 65 + 1)) + 65;
      this.maxHeartbeat = Math.floor(Math.random() * (160 - 100 + 1)) + 100;
      this.minHeartbeat = Math.floor(Math.random() * (80 - 50 + 1)) + 50;
    }, 3000);
  }

  analyzeData() {
    this.langchainService.analyzeHeartbeatData(this.ecgData)
      .then((result: string) => {
        this.analysisResult = result;
      })
      .catch((error) => {
        this.analysisResult = 'An error occurred while analyzing data.';
        console.error('Analysis Error:', error);
      });
  }

  // Method to handle user input and trigger AI analysis
  askQuestion() {
    this.langchainService.analyzeHeartbeatData(this.ecgData)
      .then((result: string) => {
        this.aiResponse = result; // Update aiResponse with the AI's response
      })
      .catch((error) => {
        this.aiResponse = 'An error occurred while communicating with AI.';
        console.error('AI Error:', error);
      });
  }
}