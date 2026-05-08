from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Callable, List

from adk_config import DEFAULT_GEMINI_MODEL


try:
    from google.adk.agents import Agent as GoogleAdkAgent

    ADK_AVAILABLE = True
except ImportError:
    try:
        from google.adk.agents.llm_agent import Agent as GoogleAdkAgent

        ADK_AVAILABLE = True
    except ImportError:
        try:
            from google.adk import Agent as GoogleAdkAgent

            ADK_AVAILABLE = True
        except ImportError:
            GoogleAdkAgent = None
            ADK_AVAILABLE = False


@dataclass
class LocalAdkAgent:
    """Small placeholder used only when google-adk is not installed."""

    name: str
    model: str = DEFAULT_GEMINI_MODEL
    description: str = ""
    instruction: str = ""
    tools: List[Callable[..., Any]] = field(default_factory=list)
    sub_agents: List[Any] = field(default_factory=list)


def create_agent(
    *,
    name: str,
    description: str,
    instruction: str,
    tools: List[Callable[..., Any]] | None = None,
    sub_agents: List[Any] | None = None,
    model: str = DEFAULT_GEMINI_MODEL,
):
    """Create a real Google ADK Agent when installed, otherwise a safe local placeholder."""

    kwargs = {
        "name": name,
        "model": model,
        "description": description,
        "instruction": instruction,
        "tools": tools or [],
    }
    if sub_agents:
        kwargs["sub_agents"] = sub_agents

    if ADK_AVAILABLE and GoogleAdkAgent is not None:
        return GoogleAdkAgent(**kwargs)
    return LocalAdkAgent(**kwargs)
