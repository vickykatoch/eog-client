import { vi, beforeAll, afterAll } from 'vitest';

// Optional: mock global WebSocket if running in Node environment
if (typeof globalThis.WebSocket === 'undefined') {
   class MockWebSocket {
      static instances: MockWebSocket[] = [];
      onopen: (() => void) | null = null;
      onmessage: ((event: MessageEvent) => void) | null = null;
      onclose: (() => void) | null = null;
      readyState = 0; // 0=CONNECTING,1=OPEN,2=CLOSING,3=CLOSED
      url: string;

      constructor(url: string) {
         this.url = url;
         MockWebSocket.instances.push(this);
         // Simulate async open event
         setTimeout(() => {
            this.readyState = 1;
            this.onopen?.();
         }, 1);
      }

      send(data: string) {
         // echo message back as a simulated server response
         setTimeout(() => {
            this.onmessage?.({ data } as MessageEvent);
         }, 1);
      }

      close() {
         this.readyState = 3;
         this.onclose?.();
      }
   }
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   (globalThis as any).WebSocket = MockWebSocket;
}

// Optional: global test hooks
beforeAll(() => {
   // e.g., start mock server, or initialize env variables
   process.env.NODE_ENV = 'test';
});

afterAll(() => {
   // cleanup if needed
   vi.restoreAllMocks();
});
