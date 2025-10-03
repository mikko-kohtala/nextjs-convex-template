// polyfill MessageChannel without using node:events
if (typeof MessageChannel === "undefined") {
  class MockMessagePort {
    onmessage: ((ev: MessageEvent) => void) | undefined;
    onmessageerror: ((ev: MessageEvent) => void) | undefined;

    close() {
      // Mock implementation - no-op
    }
    postMessage(_message: unknown, _transfer: unknown[] = []) {
      // Mock implementation - no-op
    }
    start() {
      // Mock implementation - no-op
    }
    addEventListener() {
      // Mock implementation - no-op
    }
    removeEventListener() {
      // Mock implementation - no-op
    }
    dispatchEvent(_event: Event): boolean {
      return false;
    }
  }

  class MockMessageChannel {
    port1: MockMessagePort;
    port2: MockMessagePort;

    constructor() {
      this.port1 = new MockMessagePort();
      this.port2 = new MockMessagePort();
    }
  }

  globalThis.MessageChannel = MockMessageChannel as unknown as typeof MessageChannel;
}
