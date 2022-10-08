import { OrderValidationResponseDto } from "./dtos/orderValidationResponse.dto";

class OrderMapper {

  public toOrderValidationResponseDto(
    errors: Array<string>
  ): OrderValidationResponseDto {
    return Object.assign({ isOrderValid: errors.length > 0, errors });
  }
}

export default new OrderMapper()