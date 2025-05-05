enum HttpExceptionNames {
	BAD_REQUEST = "BadRequestException",
	UNAUTHORIZED = "UnauthorizedException",
	FORBIDDEN = "ForbiddenException",
	NOT_FOUND = "NotFoundException",
	CONFLICT = "ConflictException",
	INTERNAL_SERVER_ERROR = "InternalServerErrorException",
	TOO_MANY_REQUESTS = "TooManyRequestsException",
	GAME_NOT_FOUND = "GameNotFoundException",
	GAME_FULL = "GameFullException",
	INVALID_MOVE = "InvalidMoveException",
	ROOM_EXISTS = "RoomAlreadyExistsException",
	ROOM_NOT_FOUND = "RoomNotFoundException",
}

export default HttpExceptionNames;
