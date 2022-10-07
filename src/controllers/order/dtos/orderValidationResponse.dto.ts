export interface OrderValidationResponseDto {
    isOrderValid: boolean,
    errors: Array<string>
}