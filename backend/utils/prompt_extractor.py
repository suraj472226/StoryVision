def create_story_prompt(keywords: list[str], max_length: int) -> str:
    base_prompt = (
        "Generate a creative and engaging story based on these keywords: {keywords}. "
        "The story should be approximately {max_length} words long. "
        "Include character development and a proper narrative structure "
        "with beginning, middle, and end. Make sure the story flows naturally "
        "and maintains consistent tone throughout."
    )
    return base_prompt.format(
        keywords=", ".join(keywords),
        max_length=max_length
    )