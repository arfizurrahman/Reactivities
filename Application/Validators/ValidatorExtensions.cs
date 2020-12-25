using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
            .NotEmpty()
            .MinimumLength(6).WithMessage("Password must be at least 6 characters")
            .Matches("[A-Z]").WithMessage("Password must have at least one uppercase character")
            .Matches("[A-Z]").WithMessage("Password must have at least one uppercase character")
            .Matches("[0-9]").WithMessage("Password must have a number")
            .Matches("[^a-zA-Z0-9]").WithMessage("Password must have non alphanumeric");

            return options;
        }
    }
}