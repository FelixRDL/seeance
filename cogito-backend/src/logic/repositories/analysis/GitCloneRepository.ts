/**
 * A data provider for managing a local clone of a git repository.
 */
export interface GitCloneRepository {
    /**
     * Check, whether the repo has already been cloned.
     * @param owner
     * @param name
     */
    exists(owner: string, name: string): Promise<boolean>;

    /**
     * Checkout the current revision (returns path to clone).
     * @param owner
     * @param name
     * @param token
     */
    update(owner: string, name: string): Promise<string>;

    /**
     * Clone the repository to a current folder (returns path to clone).
     * @param owner
     * @param name
     * @param token
     */
    clone(owner: string, name: string): Promise<string>;
}