import { MessageService } from "../message.service";

describe('MessageService', () => {
    let service: MessageService;

    beforeEach(() => {
        // Arrange
        service = new MessageService();
    });

    it('should have no messasges to start', () => {
        expect(service.messages.length).toBe(0);
    });

    it('should add a messages when add is called', () => {
        service.add('message1');

        expect(service.messages.length).toBe(1);
    });

    it('should remove all messages when clear is called', () => {
        // Arrange
        service.add('message1');

        // Act
        service.clear();

        // Assert
        expect(service.messages.length).toBe(0);
    });
});